import type { Identifier, Subject } from './task.interface';

export interface IObservationService {
  createObservation(
    request: CreateObservationRequest
  ): Promise<CreateObservationResponse>;
}

export interface CreateObservationRequest {
  status: string;
  code: string;
  codeName: string;
  subject: Subject;
  effectiveDateTime: string;
  measurement: Measurement;
  note: string[];
  method: string;
  identifier: Identifier[];
}
export interface CreateObservationResponse {
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
