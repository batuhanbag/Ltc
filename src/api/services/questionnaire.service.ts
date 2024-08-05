import type {
  deleteQuestionnaireResponse,
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

  async createQuestionnaireResponse(request: any): Promise<any> {
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
  ): Promise<deleteQuestionnaireResponse> {
    const { data } = await axiosInstance.delete(
      `/questionnaire-response/${request.id}`
    );
    return data;
  }
}

const questionnaire = new QuestionnaireServices();

export { QuestionnaireServices, questionnaire };
