import { type ReactNode } from 'react';
import type { Ref } from 'react';
import { SafeAreaView, View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

/**
 * For edge-specific safe area control, install `react-native-safe-area-context`
 * and use its `SafeAreaView` directly. This component uses React Native's built-in
 * `SafeAreaView` which applies insets on all edges (iOS only).
 */
export interface SafeAreaProps {
  ref?: Ref<View>;
  /** Edges to apply safe area insets to. Informational when using RN's built-in SafeAreaView. */
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: ViewStyle;
  children: ReactNode;
}

export function SafeArea(
  { ref, edges: _edges, style, children }: SafeAreaProps,
) {
  const theme = useTheme();

  const safeAreaStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.semantic.surface.page,
    ...style,
  };

  return (
    <SafeAreaView ref={ref} style={safeAreaStyle}>
      {children}
    </SafeAreaView>
  );
}
