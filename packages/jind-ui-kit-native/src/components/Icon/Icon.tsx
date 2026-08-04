import type { Ref } from 'react';
import { Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
  ref?: Ref<View>;
}

export function Icon({ ref, name, size = 18, color, style }: IconProps) {
  const theme = useTheme();

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle: TextStyle = {
    fontSize: size,
    lineHeight: size,
    color: color ?? theme.semantic.text.primary,
    ...style,
  };

  return (
    <View ref={ref} style={containerStyle} accessibilityLabel={name}>
      <Text style={textStyle}>{name}</Text>
    </View>
  );
}
