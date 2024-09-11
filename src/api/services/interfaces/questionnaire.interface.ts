import type { Author } from './auth.interface';
import type { Identifier, Subject } from './task.interface';

export interface IQuestionnaireService {
  useGetQuestionnaire(
    request: QuestionnaireRequest
  ): Promise<QuestionnaireResponse>;
  createQuestionnaireResponse(
    request: CreateQuestionnaireResponse
  ): Promise<QuestionnaireAnswers>;
  updateQuestionnaireResponse(
    request: QuestionnaireAnswers
  ): Promise<QuestionnaireAnswers>;
  useGetQuestionnaireResponse(
    request: QuestionnaireAnswersRequest
  ): Promise<QuestionnaireAnswersResponse>;
  useDeleteQuestionnaireResponse(
    request: QuestionnaireAnswersRequest
  ): Promise<DeleteQuestionnaireResponse>;
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
  valueString?: string;
  valueInteger?: number;
  valueDate?: string;
  valueCoding?: string;
}

export interface DeleteQuestionnaireResponse {
  id: string;
}

export interface CreateQuestionnaireResponse {
  status:
    | 'in-progress'
    | 'completed'
    | 'amended'
    | 'entered-in-error'
    | 'stopped';
  identifier: Identifier;
  questionnaire: string;
  subject: Subject;
  encounter: string;
  authored: string;
  author: {
    type:
      | 'Device'
      | 'Patient'
      | 'Practitioner'
      | 'RelatedPerson'
      | 'Organization'
      | 'Practitioner Role';
    id: string;
  };
  item: QuestionnaireResponseItem;
}

export interface QuestionnaireResponseItem {
  linkId: string;
  text: string;
  answer: Answer[];
}

export interface QuestionnaireResponse {
  resourceType: 'QuestionnaireResponse';
  id: string;
  identifier: {
    system: string;
    value: string;
  };
  status: string;
  questionnaire: string;
  subject: {
    type: string;
    id: string;
  };
  encounter: string;
  authored: string;
  author: {
    type: string;
    id: string;
  };
  item: Array<{
    linkId: string;
    text: string;
    answer: Array<{
      valueInteger?: number;
      valueDate?: string;
      valueString?: string;
      valueCoding?: string;
    }>;
  }>;
}

export interface UpdateQuestionnaireResponse {
  status:
    | 'in-progress'
    | 'completed'
    | 'amended'
    | 'entered-in-error'
    | 'stopped';
  identifier: Identifier;
  questionnaire: string;
  subject: Subject;
  encounter: string;
  authored: string;
  author: {
    type:
      | 'Device'
      | 'Patient'
      | 'Practitioner'
      | 'RelatedPerson'
      | 'Organization'
      | 'Practitioner Role';
    id: string;
  };
  item: QuestionnaireResponseItem;
}
