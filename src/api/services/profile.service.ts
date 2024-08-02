import type {
  IProfileService,
  ProfileRequest,
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from './interfaces';

class ProfileService implements IProfileService {
  async updateProfile(
    request: UpdateProfileRequest
  ): Promise<UpdateProfileResponse> {
    const { data } = await axiosInstance.put(`/Patient/${request.id}`, request);
    return data;
  }

  async getProfile(request: ProfileRequest): Promise<ProfileResponse> {
    const { data } = await axiosInstance.get(`/Patient/${request.id}`);
    return data;
  }
}

const profile = new ProfileService();

export { ProfileService, profile };
