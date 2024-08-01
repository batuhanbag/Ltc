import React from 'react';
import {
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import moment from 'moment';
import { getTheme, makeStyles, moderateScale, verticalScale } from '../utils';
import { Text } from './Text';
import { Icon, type IconTypes } from './Icon';
import { completedDate } from 'src/utils/taskCheckOperations';

interface CalendarProps {
  day: {
    id: number;
    name: string;
    date: string;
  };
  index: number;
  completedDates: { type: string; outputList: Set<string> }[];

  dayContainerStyle?: StyleProp<ViewStyle>;
  dayTextStyle?: StyleProp<TextStyle>;
  todayTextStyle?: StyleProp<TextStyle>;
  pastTextStyle?: StyleProp<TextStyle>;
  futureTextStyle?: StyleProp<TextStyle>;
  todayColor?: string;
  pastColor?: string;
  futureColor?: string;
  customDateCheck?: (date: string) => {
    isToday: boolean;
    isPast: boolean;
    isFuture: boolean;
  };
  checkIconColor?: string;
  checkIconSize?: number;
  checkIconName?: IconTypes;
  completedIconName: IconTypes;
  failureIconName: IconTypes;
}

const Calendar: React.FC<CalendarProps> = ({
  day,
  index,
  customDateCheck,
  completedDates,
  ...props
}) => {
  const styles = useStyles(props);

  const completed = React.useMemo(() => {
    return completedDate(completedDates, day.date);
  }, [completedDates, day.date]);

  const dateStatus = customDateCheck
    ? customDateCheck(day.date)
    : {
        isToday: moment().isSame(day.date, 'day'),
        isPast: moment().isAfter(day.date, 'day'),
        isFuture: moment().isBefore(day.date, 'day'),
      };

  const { isToday, isPast, isFuture } = dateStatus;

  const getTextStyle = () => [
    props.dayTextStyle || styles.dayText,
    isToday && (props.todayTextStyle || styles.todayText),
    isPast && (props.pastTextStyle || styles.pastText),
    isFuture && (props.futureTextStyle || styles.futureText),
  ];

  return (
    <View
      key={`${index}-day`}
      style={props.dayContainerStyle || styles.dayContainer}
    >
      <Text style={getTextStyle()} text={day.name} />
      <Icon
        icon={
          completed
            ? props.completedIconName
            : props.failureIconName || 'noCalendarCheck'
        }
        size={props.checkIconSize || 24}
        color={props.checkIconColor || getTheme().colors.primary}
      />
    </View>
  );
};

export { Calendar };

const useStyles = makeStyles((props: CalendarProps) => ({
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(9),
  },
  dayText: {
    fontSize: moderateScale(13),
    lineHeight: moderateScale(16),
  },
  todayText: {
    color: props.todayColor || getTheme().colors.primary,
    fontWeight: 'bold',
  },
  pastText: {
    color: props.pastColor || getTheme().colors.text,
  },
  futureText: {
    color: props.futureColor || getTheme().colors.text,
  },
}));
