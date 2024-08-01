import {
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
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
}

const TaskCard = ({ onTaskPress, task, key, ...props }: TaskCardProps) => {
  const styles = useStyles(props);
  return (
    <TouchableOpacity
      key={`${key}-task`}
      onPress={onTaskPress}
      style={styles.taskCard}
    >
      <Text
        text={task.name}
        size={props.taskTextSize || 'sm'}
        color={props.taskTextColor || getTheme().colors.black}
        style={props.taskTextStyle}
      />
      <View style={styles.taskDetail}>
        <Icon icon={task.icon as IconTypes} size={props.taskIconSize || 35} />
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
