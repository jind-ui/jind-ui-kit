import type { Ref } from 'react';
import { StatusBar, View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface StatusBarConfigProps {
  barStyle?: 'light-content' | 'dark-content';
  backgroundColor?: string;
  translucent?: boolean;
  animated?: boolean;
  hidden?: boolean;
  ref?: Ref<View>;
}

const hiddenContainerStyle: ViewStyle = {
  width: 0,
  height: 0,
  overflow: 'hidden',
  position: 'absolute',
};

export function StatusBarConfig({
  ref,
  barStyle = 'dark-content',
  backgroundColor,
  translucent = true,
  animated = true,
  hidden = false,
}: StatusBarConfigProps) {
  const theme = useTheme();
  const resolvedBg = backgroundColor ?? theme.semantic.surface.page;

  return (
    <View ref={ref} style={hiddenContainerStyle}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={resolvedBg}
        translucent={translucent}
        animated={animated}
        hidden={hidden}
      />
    </View>
  );
}
