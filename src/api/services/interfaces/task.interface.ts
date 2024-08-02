export interface ITaskService {
  readonly createGoal: (body: CreateGoalRequest) => Promise<CreateGoalResponse>;
  readonly createTasks: (
    body: CreateTaskRequest
  ) => Promise<CreateTaskResponse[]>;
  readonly createCarePlan: (body: any) => Promise<any>;
  readonly getTasks: (body: TasksRequest) => Promise<TasksResponse>;
  readonly updateTask: (body: any) => Promise<UpdateTaskResponse>;
}

export interface CreateGoalResponse {
  resourceType: string;
  id: string;
  lifecycleStatus: string;
  description: string;
  subject: Subject;
  achievementStatus: string;
  category: Category[];
  priority: string;
  startDate: string;
}

export interface CreateGoalRequest {
  userId: string;
}

export interface Subject {
  type: string;
  id: string;
}

export interface Category {
  code: string;
  text: string;
}

export interface CreateTaskRequest {
  tasks: string[];
  userId: string;
  taskCode: string;
}

export interface TasksResponse {
  data: Task[];
  total: number;
}
export interface Task {
  id: string;
  status: string;
  intent: string;
  code: Code;
  owner: Owner;
  description: string;
  authoredOn: string;
  input: Input[];
  identifier: Identifier[];
  output?: Output[];
}

export interface CreateTaskResponse {
  resourceType: string;
  id: string;
  status: string;
  intent: string;
  code: Code;
  description: string;
  authoredOn: string;
  owner: Owner;
  input: Input[];
  identifier: Identifier[];
}

export interface Code {
  text: string;
}

export interface Owner {
  type: string;
  id: string;
}

export interface Input {
  type: Type;
  valueString: string;
}

export interface Type {
  text: string;
}

export interface Identifier {
  system: string;
  value: string;
}

export interface TasksRequest {
  userId: string;
  category: string;
  status: string;
}

export interface UpdateTaskResponse {
  resourceType: string;
  id: string;
  status: string;
  intent: string;
  code: Code;
  description: string;
  authoredOn: string;
  owner: Owner;
  input: Input[];
  output: Output[];
  identifier: Identifier[];
}

export interface Output {
  type: TaskType;
  valueBoolean: boolean;
  valueString: string;
}

export interface TaskType {
  text: string;
}

export interface deleteTaskRequest {
  id: string;
}

export interface CreateCarePlanRequest {
  userId: string;
  goalIds: string;
  tasks: CreateTaskResponse[];
  carePlanCategory: string;
}
