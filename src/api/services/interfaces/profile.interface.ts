import type { Name, Telecom } from './auth.interface';

export interface IProfileService {
  updateProfile(request: UpdateProfileRequest): Promise<UpdateProfileResponse>;
  getProfile(request: ProfileRequest): Promise<ProfileResponse>;
}

export interface UpdateProfileRequest {
  resourceType: string;
  id: string;
  name: Name[];
  telecom: Telecom[];
}

export interface UpdateProfileResponse {
  id: string;
  name: Name[];
  telecom: Telecom[];
  communicationLanguage: string[];
}

export interface ProfileResponse {
  resourceType: string;
  id: string;
  name: Name[];
  telecom: Telecom[];
}

export interface ProfileRequest {
  id: string;
}
