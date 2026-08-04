import { type ReactNode } from 'react';
import type { Ref } from 'react';
import { ScrollView, RefreshControl, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface PullToRefreshProps {
  ref?: Ref<ScrollView>;
  refreshing: boolean;
  onRefresh: () => void;
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  tintColor?: string;
  title?: string;
  progressBackgroundColor?: string;
  progressViewOffset?: number;
}

const defaultStyle: ViewStyle = { flex: 1 };

export function PullToRefresh(
  {
    ref,
    refreshing,
    onRefresh,
    children,
    style,
    contentContainerStyle,
    tintColor,
    title,
    progressBackgroundColor,
    progressViewOffset,
  }: PullToRefreshProps,
) {
  const theme = useTheme();
  const resolvedTintColor = tintColor ?? theme.semantic.fill.primary;
  const resolvedProgressBg = progressBackgroundColor ?? theme.semantic.surface.card;

  const mergedStyle: ViewStyle = style ? { ...defaultStyle, ...style } : defaultStyle;

  return (
    <ScrollView
      ref={ref}
      style={mergedStyle}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={resolvedTintColor}
          title={title}
          progressBackgroundColor={resolvedProgressBg}
          progressViewOffset={progressViewOffset}
        />
      }
    >
      {children}
    </ScrollView>
  );
}
