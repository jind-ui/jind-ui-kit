import { type ReactNode } from 'react';
import type { Ref } from 'react';
import { ScrollView, View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { SafeArea } from '../SafeArea';
import { StatusBarConfig } from '../StatusBarConfig';
import { NavigationBar } from '../NavigationBar';

export interface ScreenContainerProps {
  ref?: Ref<View>;
  title?: string;
  onBack?: () => void;
  rightContent?: ReactNode;
  scroll?: boolean;
  children: ReactNode;
  statusBarStyle?: 'light-content' | 'dark-content';
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  testID?: string;
}

export function ScreenContainer(
  {
    ref,
    title,
    onBack,
    rightContent,
    scroll = false,
    children,
    statusBarStyle,
    edges = ['top', 'bottom'],
    style,
    contentContainerStyle,
    testID,
  }: ScreenContainerProps,
) {
  const theme = useTheme();

  const showNavigationBar = title != null || onBack != null;

  const rootStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.semantic.surface.page,
    ...style,
  };

  const contentStyle: ViewStyle = {
    flex: 1,
  };

  const mergedContentContainerStyle: ViewStyle = {
    flexGrow: 1,
    ...contentContainerStyle,
  };

  return (
    <SafeArea edges={edges} style={rootStyle}>
      <StatusBarConfig barStyle={statusBarStyle} />
      {showNavigationBar && (
        <NavigationBar
          title={title}
          onBack={onBack}
          rightContent={rightContent}
        />
      )}
      {scroll ? (
        <ScrollView
          ref={ref as Ref<ScrollView>}
          style={contentStyle}
          contentContainerStyle={mergedContentContainerStyle}
          testID={testID}
        >
          {children}
        </ScrollView>
      ) : (
        <View ref={ref} style={contentStyle} testID={testID}>
          {children}
        </View>
      )}
    </SafeArea>
  );
}
