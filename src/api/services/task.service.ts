import {
  filterTasksByIdentifier,
  generateUpdateTaskBody,
} from 'src/utils/task';
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
  TasksRequest,
  TasksResponse,
  updateTaskRequest,
} from './interfaces';

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
    category,
    status,
  }: TasksRequest): Promise<TasksResponse> {
    const { data } = await axiosInstance.get(
      `/task?owner=Patient/${userId}&patient=Patient/${userId}&category=${category}&status=${status}`
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
}

const task = new TaskService();

export { TaskService, task };
