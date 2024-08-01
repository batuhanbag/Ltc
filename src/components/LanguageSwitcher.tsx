import {
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { Icon, type IconTypes } from './Icon';
import { Text, type Sizes } from './Text';
import {
  getTheme,
  makeStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../utils';

interface LanguageSwitcherProps {
  handleLanguageSelection: (value: string) => void;
  item: {
    icon: IconTypes;
    title: string;
    value: string;
    id: number | string;
  };
  index: number;
  selectedLanguage: string;
  selectedLanguageIcon: IconTypes;
  nonSelectedLanguageIcon: IconTypes;
  iconSize?: number;
  textSize?: Sizes;
  iconColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

const LanguageSwitcher = ({
  handleLanguageSelection,
  item,
  index,
  selectedLanguage,
  selectedLanguageIcon,
  nonSelectedLanguageIcon,
  ...props
}: LanguageSwitcherProps) => {
  const styles = useStyles({
    ...props,
  });

  return (
    <TouchableOpacity
      onPress={() => handleLanguageSelection(item.value)}
      activeOpacity={0.5}
      key={index}
      style={styles.itemContainer}
    >
      <View style={styles.itemDetail}>
        <Icon
          icon={
            selectedLanguage === item.value
              ? selectedLanguageIcon
              : nonSelectedLanguageIcon
          }
          size={props.iconSize || 24}
        />
        <Text
          text={item.title}
          color={getTheme().colors.black}
          size={props.textSize ?? 'sm'}
          style={props.textStyle}
        />
      </View>
      <Icon
        icon={item.icon}
        size={24}
        color={props.iconColor || getTheme().colors.black}
      />
    </TouchableOpacity>
  );
};

export { LanguageSwitcher };

const useStyles = makeStyles((props: LanguageSwitcherProps) => ({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(20),
    backgroundColor: getTheme().colors.white,
    borderRadius: moderateScale(30),
    marginTop: verticalScale(10),
    borderWidth: 2,
    borderColor:
      props.selectedLanguage === props.item.value
        ? getTheme().colors.primary
        : getTheme().colors.white,
  },
  itemDetail: { flexDirection: 'row', alignItems: 'center', gap: scale(10) },
}));
