export interface IAuthService {
  readonly login: (body: LoginBody) => Promise<LoginResponse>;
  readonly register: (body: RegisterBody) => Promise<RegisterResponse>;
  readonly forgotPassword: (email: string) => Promise<any>;
  readonly changePassword: (body: ChangePasswordBody) => Promise<any>;
  readonly resetPassword: (body: ResetPasswordBody) => Promise<any>;
  readonly deleteUserAccount: (isSoftDelete: boolean) => Promise<any>;
  readonly authMe: () => Promise<AuthMeResponse>;
}

export interface RegisterBody {
  email: string;
  firstName: string;
  lastName: string;
  projectId: string;
  resourceType: string;
  sendDefaultEmail: boolean;
  password: string;
  clientId: string;
}

export interface RegisterResponse {}

export interface LoginBody {
  email: string;
  password: string;
  clientId: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordBody {
  email: string;
  recaptchaToken: string;
  sendDefaultEmail: boolean;
  projectId: string;
}

export interface AuthMeResponse {
  project: Project;
  membership: Membership;
  profile: Patient;
  config: Config;
  accessPolicy: AccessPolicy;
  security: Security;
}

export interface Project {
  resourceType: string;
  id: string;
  name: string;
  strictMode: boolean;
}

export interface Membership {
  resourceType: string;
  id: string;
  user: User;
  profile: Profile;
}

export interface User {
  reference: string;
  display: string;
}

export interface Profile {
  reference: string;
  display: string;
}

export interface Patient {
  resourceType: string;
  meta: Meta;
  name: Name[];
  telecom: Telecom[];
  photo: Photo[];
  id: string;
}

export interface Meta {
  project: string;
  versionId: string;
  lastUpdated: string;
  author: Author;
  compartment: Compartment[];
}

export interface Author {
  reference: string;
}

export interface Compartment {
  reference: string;
}

export interface Name {
  given: string[];
  family: string;
}

export interface Telecom {
  system: string;
  use: string;
  value: string;
}

export interface Photo {
  url: string;
  contentType: string;
  title: string;
}

export interface Config {
  resourceType: string;
  menu: Menu[];
}

export interface Menu {
  title: string;
  link: Link[];
}

export interface Link {
  name: string;
  target: string;
}

export interface AccessPolicy {
  resourceType: string;
  resource: Resource[];
  ipAccessRule: any[];
}

export interface Resource {
  resourceType: string;
  compartment?: ResourceCompartment;
  readonly?: boolean;
  criteria?: string;
}

export interface ResourceCompartment {
  reference: string;
}

export interface Security {
  mfaEnrolled: boolean;
  sessions: Session[];
}

export interface Session {
  id: string;
  lastUpdated: string;
  authMethod: string;
  remoteAddress: string;
}
