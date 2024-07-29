import {
  type AuthMeResponse,
  type ChangePasswordBody,
  type IAuthService,
  type LoginBody,
  type LoginResponse,
  type RegisterBody,
  type RegisterResponse,
  type ResetPasswordBody,
} from './interfaces/auth.interface';

class AuthService implements IAuthService {
  public login = async (body: LoginBody): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post('/auth/login', body);
    return data;
  };

  public register = async (body: RegisterBody): Promise<RegisterResponse> => {
    const { data } = await axiosInstance.post('/auth/signup', body);
    return data;
  };

  public forgotPassword = async (email: string): Promise<any> => {
    return Promise.resolve(email);
  };

  public changePassword = async (body: ChangePasswordBody): Promise<any> => {
    const { data } = await axiosInstance.post('/auth/change-password', body);
    return data;
  };

  public resetPassword = async (body: ResetPasswordBody): Promise<any> => {
    const { data } = await axiosInstance.post('/auth/reset-password', body);
    return data;
  };

  public deleteUserAccount = async (isSoftDelete: boolean): Promise<any> => {
    const { data } = await axiosInstance.delete('auth/deregister-user', {
      data: isSoftDelete,
    });
    return data;
  };

  public authMe = async (): Promise<AuthMeResponse> => {
    const { data } = await axiosInstance.get('/auth/me');
    return data;
  };
}

const auth = new AuthService();

export { AuthService, auth };
