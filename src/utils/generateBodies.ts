import moment from 'moment';
import type { CreateTaskResponse, Task } from 'src/api';

export const generateGoalBody = (userId: string) => {
  return {
    lifecycleStatus: 'active',
    subject: {
      type: 'Patient',
      id: userId,
    },
    description: 'User greenspark goal reward',
    category: [
      {
        code: 'weekly-user-process',
        text: 'Weekly User Process',
      },
    ],
    priority: 'medium-priority',
    startDate: generatePeriodDateISO().start,
    achievementStatus: 'in-progress',
  };
};

export const generatePeriodDateISO = () => {
  return {
    start: moment().format('YYYY-MM-DD'),
    end: moment().add(1, 'week').format('YYYY-MM-DD'),
  };
};

export const generateTaskTypes = (tasks: string[]) => {
  return tasks.map((task) => {
    return task;
  });
};

export const generateTaskBodies = (
  userId: string,
  tasks: string[],
  taskCode: string
) => {
  const bodies = tasks?.map((taskType) => {
    return {
      status: 'in-progress',
      intent: 'plan',
      code: {
        text: taskCode,
      },
      owner: {
        type: 'Patient',
        id: userId,
      },
      description: `Soulfi user ${taskType} task`,
      authoredOn: generatePeriodDateISO().start,
      input: [
        {
          type: {
            text: taskType,
          },
          valueString: `${taskType} task type`,
        },
      ],
      identifier: [
        {
          system: 'task-type',
          value: taskType,
        },
      ],
    };
  });
  return bodies as Task[];
};

export const goalsFilter = (goals: any[]) => {
  return goals.filter((goal) => {
    return !!goal?.lifecycleStatus;
  });
};

export const taskFilter = (tasks: any[]) => {
  return tasks.filter((task) => {
    return !!task?.intent;
  });
};

export const filterInitialResponse = (response: any) => {
  const goals = goalsFilter(response);
  const tasks = taskFilter(response);
  return {
    goalId: goals?.[0]?.id,
    tasks,
  };
};

const generateCarePlanActivites = (tasks: CreateTaskResponse[]) => {
  const activities = tasks.map((item) => {
    return {
      reference: {
        type: 'Task',
        id: item?.id,
      },
    };
  });
  return activities;
};

export const generateCarePlanBody = (
  userId: string,
  goalIds: string,
  tasks: CreateTaskResponse[],
  carePlanCategory: string
) => {
  return {
    status: 'active',
    intent: 'plan',
    subject: {
      type: 'Patient',
      id: userId,
    },
    period: {
      start: generatePeriodDateISO().start,
      end: generatePeriodDateISO().end,
    },
    category: [carePlanCategory],
    title: 'Greenspark Plan',
    description: 'Soulfi users general progress tracking plan for greenspark',
    goal: [goalIds],
    activity: generateCarePlanActivites(tasks),
  };
};
