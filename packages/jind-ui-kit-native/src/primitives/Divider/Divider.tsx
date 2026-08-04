import type { Ref } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface DividerProps extends Omit<ViewProps, 'style'> {
  ref?: Ref<View>;
  orientation?: 'horizontal' | 'vertical';
  tone?: 'subtle' | 'default';
  style?: ViewStyle;
}

export function Divider({
  ref,
  orientation = 'horizontal',
  tone = 'subtle',
  style,
  ...rest
}: DividerProps) {
  const theme = useTheme();
  const color = tone === 'subtle' ? theme.semantic.border.subtle : theme.semantic.border.default;
  const isHorizontal = orientation === 'horizontal';

  const dividerStyle: ViewStyle = {
    flexShrink: 0,
    ...(isHorizontal
      ? { height: 1, backgroundColor: color, width: '100%' as ViewStyle['width'] }
      : { width: 1, backgroundColor: color, alignSelf: 'stretch' as const }),
    ...style,
  };

  return (
    <View
      ref={ref}
      accessibilityRole="none"
      style={dividerStyle}
      {...rest}
    />
  );
}
