import type { Identifier, Subject } from './task.interface';

export interface IObservationService {
  createObservation(request: ObservationBody): Promise<ObservationResponse>;
}

export interface ObservationBody {
  status: string;
  code: string;
  codeName?: string;
  subject: Subject;
  effectiveDateTime?: string;
  measurement?: Measurement;
  note?: string[];
  method?: string;
  identifier?: Identifier[];
}
export interface ObservationResponse {
  resourceType: string;
  id: string;
  status: string;
  code: string;
  codeName: string;
  subject: Subject;
  measurement: Measurement;
  note: string[];
  method: string;
  effectiveDateTime: string;
  identifier: Identifier[];
}

export interface Measurement {
  type: string;
  value: string;
}
