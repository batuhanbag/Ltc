export interface OperationOutcome {
  resourceType: 'OperationOutcome';
  id: string;
  issue: Array<{
    severity: string;
    code: string;
    details: {
      text: string;
    };
  }>;
  extension: Array<{
    url: string;
    extension: Array<{
      url: string;
      valueId: string;
    }>;
  }>;
}
