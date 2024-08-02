import type {
  IObservationService,
  CreateObservationRequest,
  CreateObservationResponse,
} from './interfaces';

class ObservationService implements IObservationService {
  async createObservation(
    request: CreateObservationRequest
  ): Promise<CreateObservationResponse> {
    const { data } = await axiosInstance.post('/observation', request);
    return data;
  }
}

const observation = new ObservationService();

export { ObservationService, observation };
