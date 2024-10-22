import {
  filterTasksByIdentifier,
  generateUpdateTaskBody,
} from '../../utils/task';
import {
  generateCarePlanBody,
  generateGoalBody,
  generateTaskBodies,
} from '../../utils/generateBodies';
import type {
  CreateCarePlanRequest,
  CreateGoalRequest,
  CreateGoalResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  ITaskService,
  Task,
  TaskUpdate,
  TasksRequest,
  TasksResponse,
  updateTaskRequest,
} from './interfaces/task.interface';

class TaskService implements ITaskService {
  public async createGoal(
    body: CreateGoalRequest
  ): Promise<CreateGoalResponse> {
    const { data } = await axiosInstance.post(
      '/goal',
      generateGoalBody(body.userId as string)
    );
    return data;
  }

  public async createTasks(
    body: CreateTaskRequest
  ): Promise<CreateTaskResponse[]> {
    const bodies = generateTaskBodies(body.userId, body.tasks, body.taskCode);
    const data = await Promise.all(
      bodies?.map(async (task) => {
        const response = await axiosInstance.post('/task', task);
        return response.data as CreateTaskResponse;
      })
    );
    return data;
  }

  public async createTask(body: Task): Promise<CreateTaskResponse> {
    const { data } = await axiosInstance.post('/task', body);
    return data;
  }

  public async createCarePlan(body: CreateCarePlanRequest): Promise<any> {
    const { data } = await axiosInstance.post(
      '/care-plan',
      generateCarePlanBody(
        body.userId as string,
        body.goalIds,
        body.tasks as CreateTaskResponse[],
        body.carePlanCategory
      )
    );
    return data;
  }
  public async getTasks({
    userId,
    code,
    status,
  }: TasksRequest): Promise<TasksResponse> {
    const { data } = await axiosInstance.get(
      `fhir/Task?owner=Patient/${userId}&code=${code}&status=${status}`
    );
    return data;
  }
  public async updateTask(body: updateTaskRequest): Promise<any> {
    const filterTask = filterTasksByIdentifier(body.task, body.identifier);
    const reqBody = generateUpdateTaskBody({
      task: filterTask[0],
      type: body.identifier,
    });
    const { data } = await axiosInstance.put(`/task/${reqBody.id}`, reqBody);
    return data;
  }

  public async update(id: string, body: TaskUpdate): Promise<Task> {
    const { data } = await axiosInstance.put(`/task/${id}`, body);
    return data;
  }
}

const task = new TaskService();

export { TaskService, task };
