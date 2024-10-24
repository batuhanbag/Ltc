import { Dimensions, PixelRatio, Platform } from 'react-native';
export const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const isSmallDevice = (): boolean => {
  return Dimensions.get('window').height < 700;
};

export const isMediumDevice = (): boolean => {
  return Dimensions.get('window').height < 800;
};

export const isSmallestDevice = (): boolean => {
  return Dimensions.get('window').height < 600;
};

export const isIpad = (): boolean => {
  return Dimensions.get('window').height > 1000;
};

export const isIos = (): boolean => {
  return Platform.OS === 'ios';
};

export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

const scale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

export const getWindowWidth = (percentage: string | number): number => {
  if (typeof percentage === 'number') {
    return Dimensions.get('window').width * (percentage / 100);
  } else {
    return (
      Dimensions.get('window').width *
      (Number(percentage.replace('%', '')) / 100)
    );
  }
};
export const getWindowHeight = (percentage: string | number): number => {
  if (typeof percentage === 'number') {
    return Dimensions.get('window').height * (percentage / 100);
  } else {
    return (
      Dimensions.get('window').height *
      (Number(percentage.replace('%', '')) / 100)
    );
  }
};

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

const getFontSize = (baseFontSize: number) => {
  const fontScale = PixelRatio.getFontScale();
  return baseFontSize / fontScale;
};

export { scale, verticalScale, moderateScale, getFontSize };
