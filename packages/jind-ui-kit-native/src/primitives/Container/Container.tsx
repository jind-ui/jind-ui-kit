import type { Ref, ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import type { Space } from '../../types';
import { resolveSpace } from '../../utils/styles';

export interface ContainerProps extends Omit<ViewProps, 'style'> {
  ref?: Ref<View>;
  maxWidth?: number;
  centerContent?: boolean;
  px?: Space;
  style?: ViewStyle;
  children?: ReactNode;
}

export function Container({
  ref,
  maxWidth = 1200,
  centerContent = false,
  px = 7,
  style,
  children,
  ...rest
}: ContainerProps) {
  const horizontalPadding = resolveSpace(px);

  const containerStyle: ViewStyle = {
    width: '100%',
    maxWidth,
    alignSelf: 'center',
    paddingHorizontal: horizontalPadding,
    ...(centerContent && {
      alignItems: 'center',
    }),
    ...style,
  };

  return (
    <View ref={ref} style={containerStyle} {...rest}>
      {children}
    </View>
  );
}
