export interface IAuthService {
  readonly login: (body: LoginBody) => Promise<LoginResponse>;
  readonly register: (body: RegisterBody) => Promise<RegisterResponse>;
  readonly forgotPassword: (
    body: ForgotPasswordBody
  ) => Promise<ForgotPasswordResponse>;
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
  resourceType: UserResourceType;
  sendDefaultEmail: boolean;
  password: string;
  clientId: string;
}

export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export type UserResourceType = 'Patient' | 'Practitioner';
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
  recaptchaToken?: string;
  sendDefaultEmail: boolean;
  projectId?: string;
  recaptchaSiteKey?: string;
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
  resourceType: UserResourceType;
  id: string;
  name: string;
  strictMode: boolean;
}

export interface Membership {
  resourceType: UserResourceType;
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
  resourceType: UserResourceType;
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
  resourceType: UserResourceType;
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
  resourceType: UserResourceType;
  resource: Resource[];
  ipAccessRule: any[];
}

export interface Resource {
  resourceType: UserResourceType;
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

export interface ForgotPasswordBody {
  email: string;
  sendDefaultEmail: boolean;
  recaptchaToken: string;
  projectId: string;
}

export interface ForgotPasswordResponse {
  resourceType: UserResourceType;
  id: string;
  issue: Issue[];
  extension: Extension[];
}

export interface Issue {
  severity: string;
  code: string;
  details: Details;
}

export interface Details {
  text: string;
}

export interface Extension {
  url: string;
  extension: Extension2[];
}

export interface Extension2 {
  url: string;
  valueId: string;
}
