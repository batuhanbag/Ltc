import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { jwtDecode } from 'jwt-decode';

export enum SocialLoginTypes {
  GOOGLE = 'google',
  APPLE = 'apple',
}

export enum SocialLoginActions {
  SIGN_IN = 'signin',
  CONTINUE = 'continue',
}

export interface AppleAuthResponse {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  c_hash: string;
  email: string;
  email_verified: boolean;
  auth_time: number;
  nonce_supported: boolean;
}

export interface UserInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface GoogleConfig {
  webClientId: string;
  scopes?: string[];
  offlineAccess?: boolean;
  iosClientId?: string;
  profileImageSize?: number;
}

export interface AuthConfig {
  clientId: string;
  projectId?: string;
}

export class SocialAuth {
  private googleConfig: GoogleConfig;
  private authConfig: AuthConfig;

  constructor(googleConfig: GoogleConfig, authConfig: AuthConfig) {
    this.googleConfig = googleConfig;
    this.authConfig = authConfig;
    this.configureGoogleSignIn();
  }

  private configureGoogleSignIn = () =>
    GoogleSignin.configure(this.googleConfig);

  private handleGoogleAuth = async (): Promise<UserInfo | null> => {
    try {
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      return {
        email: user.email,
        password: user.id,
        firstName: user.givenName as string,
        lastName: user.familyName as string,
      };
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      return null;
    }
  };

  private handleAppleAuth = async (): Promise<UserInfo | null> => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const identityToken = credential.identityToken;
      if (identityToken) {
        const decodedToken = jwtDecode(identityToken) as AppleAuthResponse;
        return {
          email: decodedToken.email,
          password: decodedToken.sub,
          firstName: credential.fullName?.givenName || decodedToken.email,
          lastName: credential.fullName?.familyName || decodedToken.email,
        };
      }
      return null;
    } catch (error: any) {
      if (error?.code === 'ERR_REQUEST_CANCELED') {
        console.log('User cancelled Apple Sign in');
      } else {
        console.error('Error Apple Sign In', error);
      }
      return null;
    }
  };

  private processAuth = (
    userInfo: UserInfo,
    authFunction: Function,
    action: SocialLoginActions
  ) => {
    if (action === SocialLoginActions.SIGN_IN) {
      authFunction({
        email: userInfo.email,
        password: userInfo.password,
        clientId: this.authConfig.clientId,
      });
    } else if (action === SocialLoginActions.CONTINUE) {
      authFunction({
        email: userInfo.email,
        password: userInfo.password,
        clientId: this.authConfig.clientId,
        projectId: this.authConfig.projectId,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        resourceType: 'Patient',
        sendDefaultEmail: false,
      });
    }
  };

  public handleSocialSignIn = async (
    provider: SocialLoginTypes,
    SignIn: Function
  ) => {
    const authHandlers = {
      [SocialLoginTypes.GOOGLE]: this.handleGoogleAuth,
      [SocialLoginTypes.APPLE]: this.handleAppleAuth,
    };
    const userInfo = await authHandlers[provider]();
    if (userInfo) {
      this.processAuth(userInfo, SignIn, SocialLoginActions.SIGN_IN);
    }
  };

  public handleSocialSignUp = async (
    provider: SocialLoginTypes,
    SignUp: Function
  ) => {
    const authHandlers = {
      [SocialLoginTypes.GOOGLE]: this.handleGoogleAuth,
      [SocialLoginTypes.APPLE]: this.handleAppleAuth,
    };
    const userInfo = await authHandlers[provider]();
    if (userInfo) {
      this.processAuth(userInfo, SignUp, SocialLoginActions.CONTINUE);
    }
  };
}
