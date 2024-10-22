import moment from 'moment';

export enum TasksIdentifier {
  mood = 'mood',
  journal = 'journal',
  breathing = 'breathing',
  inspiration = 'inspiration',
  chat = 'chat',
  questionnaire = 'questionnaire',
}

export function filterTasksByIdentifier(
  tasksData: any[],
  identifierValue: any
): any[] {
  return tasksData?.filter((task) =>
    task?.resource?.identifier?.some(
      (identifier: any) =>
        identifier?.value?.toLowerCase() === identifierValue?.toLowerCase()
    )
  );
}

export const generateUpdateTaskBody = ({
  task,
  type,
}: {
  task: any;
  type: any;
}) => {
  const { id, status, intent, code, owner, description, authoredOn, output } =
    task;
  return {
    id,
    status,
    intent,
    code,
    owner,
    description,
    authoredOn,
    input: [
      {
        type: {
          text: type,
        },
        valueString: `${type} task type`,
      },
    ],
    identifier: [
      {
        system: 'task-type',
        value: type,
      },
    ],
    output: output
      ? [
          ...output?.map((item: { type: { text: any } }) => ({
            ...item,
            type: item?.type?.text
              ? { text: item?.type?.text }
              : { text: type },
          })),
          {
            type: { text: type },
            valueBoolean: true,
            valueString: moment().format('YYYY-MM-DD'),
          },
        ]
      : [
          {
            type: { text: type },
            valueBoolean: true,
            valueString: moment().format('YYYY-MM-DD'),
          },
        ],
  };
};
