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
    const { data } = await axiosInstance.post(
      '/tasks',
      generateTaskBodies(body.userId, body.tasks, body.taskCode)
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
}

const task = new TaskService();

export { TaskService, task };
