import type { Author } from './auth.interface';
import type { Identifier } from './task.interface';

export interface IQuestionnaireService {
  useGetQuestionnaire(
    request: QuestionnaireRequest
  ): Promise<QuestionnaireResponse>;
  createQuestionnaireResponse(
    request: QuestionnaireAnswers
  ): Promise<QuestionnaireAnswers>;
  updateQuestionnaireResponse(
    request: QuestionnaireAnswers
  ): Promise<QuestionnaireAnswers>;
  useGetQuestionnaireResponse(
    request: QuestionnaireAnswersRequest
  ): Promise<QuestionnaireAnswersResponse>;
  useDeleteQuestionnaireResponse(
    request: QuestionnaireAnswersRequest
  ): Promise<deleteQuestionnaireResponse>;
}

export interface QuestionnaireRequest {
  identifier: string;
  status: string;
}

export interface QuestionnaireResponse {
  data: Questionnaire[];
  total: number;
}

export interface Questionnaire {
  resourceType: string;
  id: string;
  status: string;
  name: string;
  item: QuestionnaireAnswersItem[];
  identifier: Identifier[];
}

export interface QuestionnaireAnswersItem {
  linkId: string;
  type: string;
  text: string;
  answerOption?: AnswerOption[];
  repeats?: boolean;
}

export interface AnswerOption {
  valueString: string;
}

export interface QuestionnaireAnswersResponse {
  data: QuestionnaireAnswers[];
  total: number;
}

export interface QuestionnaireAnswersRequest {
  id: string;
}

export interface QuestionnaireAnswers {
  resourceType: string;
  id: string;
  status: string;
  item: Item[];
  questionnaire?: string;
  authored?: string;
  author?: Author;
}

export interface Item {
  linkId: string;
  text: string;
  answer: Answer[];
}

export interface Answer {
  valueString: string;
}

export interface deleteQuestionnaireResponse {
  id: string;
}
