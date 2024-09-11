import type {
  IObservationService,
  ObservationBody,
  ObservationResponse,
} from './interfaces';

class ObservationService implements IObservationService {
  async createObservation(
    request: ObservationBody
  ): Promise<ObservationResponse> {
    const { data } = await axiosInstance.post('/observation', request);
    return data;
  }

  async getObservationBetweenDates(
    startDate: Date,
    endDate: Date
  ): Promise<ObservationResponse[]> {
    const { data } = await axiosInstance.get(
      `/resource/Observation?date=gt${startDate}&date=lt${endDate}`
    );
    return data;
  }

  async getObservationByCode(code: string): Promise<ObservationResponse[]> {
    const { data } = await axiosInstance.get(`/observation?code=${code}`);
    return data;
  }

  async getObservationById(id: string): Promise<ObservationResponse> {
    const { data } = await axiosInstance.get(`/observation/${id}`);
    return data;
  }

  async updateObservation(
    id: string,
    updateBody: ObservationBody
  ): Promise<ObservationResponse> {
    const { data } = await axiosInstance.put(`/observation/${id}`, updateBody);
    return data;
  }
}

const observation = new ObservationService();

export { ObservationService, observation };
