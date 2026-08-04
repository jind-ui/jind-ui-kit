import { type ReactNode } from 'react';
import type { Ref } from 'react';
import { Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface NavigationBarProps {
  ref?: Ref<View>;
  title?: string;
  onBack?: () => void;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  transparent?: boolean;
  style?: ViewStyle;
  testID?: string;
}

const CONTENT_HEIGHT = 44;
const BAR_HEIGHT = 56;
const LEFT_RIGHT_MIN_WIDTH = 48;

export function NavigationBar(
  { ref, title, onBack, leftContent, rightContent, transparent = false, style, testID }: NavigationBarProps,
) {
  const theme = useTheme();

  const containerStyle: ViewStyle = {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.space[7],
    backgroundColor: transparent ? 'transparent' : theme.semantic.surface.card,
    borderBottomWidth: transparent ? 0 : theme.borderWidth.default,
    borderBottomColor: transparent ? undefined : theme.semantic.border.subtle,
    ...(transparent ? {} : theme.shadow.xs),
    ...style,
  };

  const leftSectionStyle: ViewStyle = {
    minWidth: LEFT_RIGHT_MIN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  const centerSectionStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const rightSectionStyle: ViewStyle = {
    minWidth: LEFT_RIGHT_MIN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };

  const titleStyle: TextStyle = {
    fontSize: theme.fontSize[16],
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.primary,
    textAlign: 'center',
  };

  const backButtonStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    height: CONTENT_HEIGHT,
    justifyContent: 'center',
  };

  const backChevronStyle: TextStyle = {
    fontSize: theme.fontSize[18],
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.fill.primary,
  };

  const renderLeft = () => {
    if (onBack != null) {
      return (
        <Pressable
          style={backButtonStyle}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Text style={backChevronStyle}>{'‹'}</Text>
        </Pressable>
      );
    }
    if (leftContent != null) {
      return <>{leftContent}</>;
    }
    return null;
  };

  return (
    <View ref={ref} style={containerStyle} testID={testID}>
      <View style={leftSectionStyle}>{renderLeft()}</View>
      <View style={centerSectionStyle}>
        {title != null && (
          <Text style={titleStyle} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>
      <View style={rightSectionStyle}>{rightContent != null ? rightContent : null}</View>
    </View>
  );
}
