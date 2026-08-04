import type { Ref, ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';

export interface CenterProps extends Omit<ViewProps, 'style'> {
  ref?: Ref<View>;
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  flex?: number;
  style?: ViewStyle;
  children?: ReactNode;
}

export function Center({
  ref,
  width,
  height,
  flex,
  style,
  children,
  ...rest
}: CenterProps) {
  const centerStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
    flex,
    ...style,
  };

  return (
    <View ref={ref} style={centerStyle} {...rest}>
      {children}
    </View>
  );
}
