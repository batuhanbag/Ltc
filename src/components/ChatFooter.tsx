import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { type IMessage } from 'react-native-gifted-chat';
import {
  getTheme,
  makeStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../utils';
import { Text, type TextProps } from './Text';

interface ChatFooterProps {
  isLoading: boolean;
  footerData: IMessage[];
  isShowHorizontalScrollIndicator: boolean;
  handleSelectKeyword: (item: IMessage[]) => void;
  loadingText: string;
  renderLoadingComponent: () => React.ReactElement;
  renderFooterItem: () => React.ReactElement;
  itemBackgroundColor?: string;
  itemBorderColor?: string;
  itemBorderRadius?: number;
  itemBorderWidth?: number;
  itemHeight?: number;
  itemMinWidth?: number;
  itemTextColor?: string;
  itemTextAlign?: 'left' | 'right' | 'center';
  itemTextSize?: TextProps['size'];
}

const ChatFooter: React.FC<ChatFooterProps> = ({
  isLoading,
  footerData,
  isShowHorizontalScrollIndicator,
  handleSelectKeyword,
  renderFooterItem,
  loadingText,
  itemTextSize,
  renderLoadingComponent,
  ...props
}) => {
  const styles = useStyles(props);
  const { colors } = getTheme();

  if (isLoading) {
    return renderLoadingComponent ? (
      renderLoadingComponent()
    ) : (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          style={styles.activityIndicator}
          color={colors.primary}
        />
        <Text>{loadingText}</Text>
      </View>
    );
  }

  if (!footerData) {
    return null;
  }

  return (
    <FlatList
      data={footerData}
      showsHorizontalScrollIndicator={isShowHorizontalScrollIndicator}
      keyExtractor={(_item, index) => `${index}-recommendedList`}
      horizontal
      contentContainerStyle={styles.initialList}
      style={styles.initialList}
      renderItem={({ item, index }) => (
        <>
          {renderFooterItem ? (
            renderFooterItem()
          ) : (
            <TouchableOpacity
              disabled={isLoading}
              key={`${index}-initialKeyword`}
              onPress={() => handleSelectKeyword([item])}
              style={styles.initialItem}
            >
              <Text text={item.text} size={itemTextSize} />
            </TouchableOpacity>
          )}
        </>
      )}
    />
  );
};

export { ChatFooter };

const useStyles = makeStyles((_props: ChatFooterProps) => ({
  activityIndicator: {
    marginRight: moderateScale(12),
  },
  initialItem: {
    backgroundColor: _props.itemBackgroundColor || '#ECEBFF',
    borderColor: _props.itemBorderColor || '#FAFAFA',
    borderRadius: _props.itemBorderRadius || 60,
    borderWidth: _props.itemBorderWidth || 1.2,
    marginHorizontal: scale(5),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(2),
    height: _props.itemHeight || verticalScale(32),
    minWidth: _props.itemMinWidth || scale(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },

  initialList: {
    marginTop: verticalScale(5),
    marginLeft: scale(5),
  },

  loadingContainer: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginLeft: moderateScale(12),
  },
  keywordText: {
    color: _props.itemTextColor || '#000',
    textAlign: _props.itemTextAlign || 'center',
  },
}));
