import type { Ref, ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';

export interface AspectRatioProps extends Omit<ViewProps, 'style'> {
  ref?: Ref<View>;
  ratio?: number;
  width?: ViewStyle['width'];
  style?: ViewStyle;
  children?: ReactNode;
}

export function AspectRatio({
  ref,
  ratio = 16 / 9,
  width,
  style,
  children,
  ...rest
}: AspectRatioProps) {
  const outerStyle: ViewStyle = {
    width: width ?? '100%',
    aspectRatio: ratio,
    ...style,
  };

  return (
    <View ref={ref} style={outerStyle} {...rest}>
      {children}
    </View>
  );
}
