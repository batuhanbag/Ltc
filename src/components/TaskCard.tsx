import {
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  getTheme,
  makeStyles,
  moderateScale,
  scale,
  verticalScale,
  width,
} from '../utils';
import { Icon, type IconTypes } from './Icon';
import { Text, type Sizes } from './Text';
import React from 'react';
import { taskCompletedCheck } from '../utils/taskCheckOperations';

export interface TaskDataProps {
  id: number;
  name: string;
  icon: IconTypes;
  stack: string;
  screen: string;
  type: string;
}

interface TaskCardProps {
  onTaskPress: () => void;
  task: TaskDataProps;
  key: number;
  completedDates: {
    type: string;
    outputList: Set<string>;
  }[];
  cardBorderWidth?: number;
  cardBorderColor?: string;
  cardBorderRadius?: number;
  cardBackgroundColor?: string;
  cardWidth?: number;
  taskTextStyle?: StyleProp<TextStyle>;
  taskTextColor?: string;
  taskTextSize?: Sizes;
  taskIconStyle?: StyleProp<TextStyle>;
  taskIconSize?: number;
  taskIconColor?: string;
  successIcon: IconTypes;
  failureIcon: IconTypes;
  circleIconSize?: number;
  rootStyle?: StyleProp<ViewStyle>;
}

const TaskCard = ({
  onTaskPress,
  task,
  key,
  completedDates,
  ...props
}: TaskCardProps) => {
  const styles = useStyles(props);
  const isSuccess = React.useMemo(() => {
    return taskCompletedCheck(completedDates, task.type);
  }, [completedDates, task]);

  return (
    <TouchableOpacity
      key={`${key}-task`}
      onPress={onTaskPress}
      style={[styles.taskCard, props.rootStyle]}
    >
      <Text
        text={task.name}
        size={props.taskTextSize || 'sm'}
        color={props.taskTextColor || getTheme().colors.black}
        style={props.taskTextStyle}
      />
      <View style={styles.taskDetail}>
        <Icon icon={task.icon as IconTypes} size={props.taskIconSize || 35} />
        <Icon
          icon={isSuccess ? props.successIcon : props.failureIcon}
          size={props.circleIconSize || 24}
        />
      </View>
    </TouchableOpacity>
  );
};

export { TaskCard };

const useStyles = makeStyles((props: TaskCardProps) => ({
  taskCard: {
    borderWidth: props.cardBorderWidth || 1,
    borderColor: props.cardBorderColor || getTheme().colors.white,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(10),
    borderRadius:
      moderateScale(props.cardBorderRadius as number) || moderateScale(16),
    gap: verticalScale(15),
    width: props.cardWidth || width / 2 - scale(30),
    backgroundColor: props.cardBackgroundColor || getTheme().colors.white,
    marginRight: scale(20),
  },
  taskDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
