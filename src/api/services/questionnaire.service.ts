import type {
  CreateQuestionnaireResponse,
  DeleteQuestionnaireResponse,
  IQuestionnaireService,
  QuestionnaireAnswersRequest,
  QuestionnaireAnswersResponse,
  QuestionnaireRequest,
  QuestionnaireResponse,
} from './interfaces';

class QuestionnaireServices implements IQuestionnaireService {
  async useGetQuestionnaire(
    request: QuestionnaireRequest
  ): Promise<QuestionnaireResponse> {
    const { data } = await axiosInstance.get(`/questionnaire`, {
      params: request,
    });
    return data;
  }

  async getQuestionnaireById(id: string): Promise<any> {
    const { data } = await axiosInstance.get(`/questionnaire/${id}`);
    return data;
  }

  async getQuestionnaireByName(params: {
    questionnaireName: string;
    language: 'de' | 'en' | 'tr';
  }): Promise<any> {
    const { questionnaireName, language } = params;
    const { data } = await axiosInstance.get(
      `/questionnaire?identifier=${language}&name=${questionnaireName}`
    );
    return data;
  }

  async createQuestionnaireResponse(
    request: CreateQuestionnaireResponse
  ): Promise<any> {
    const { data } = await axiosInstance.post(
      '/questionnaire-response',
      request
    );
    return data;
  }

  async updateQuestionnaireResponse(request: any): Promise<any> {
    const { data } = await axiosInstance.put(
      `/questionnaire-response/${request.questionnaire}`,
      request
    );
    return data;
  }

  async useGetQuestionnaireResponse(
    request: QuestionnaireAnswersRequest
  ): Promise<QuestionnaireAnswersResponse> {
    const { data } = await axiosInstance.get(
      `/questionnaire-response?author=Patient/${request.id}`
    );
    return data;
  }

  async useDeleteQuestionnaireResponse(
    request: any
  ): Promise<DeleteQuestionnaireResponse> {
    const { data } = await axiosInstance.delete(
      `/questionnaire-response/${request.id}`
    );
    return data;
  }
}

const questionnaire = new QuestionnaireServices();

export { QuestionnaireServices, questionnaire };
