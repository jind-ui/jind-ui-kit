import type { Ref, ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle, type FlexStyle } from 'react-native';
import type { Space } from '../../types';
import { resolveSpace } from '../../utils/styles';

export interface WrapProps extends Omit<ViewProps, 'style'> {
  ref?: Ref<View>;
  gap?: Space;
  align?: FlexStyle['alignItems'];
  justify?: FlexStyle['justifyContent'];
  direction?: 'row' | 'row-reverse';
  style?: ViewStyle;
  children?: ReactNode;
}

export function Wrap({
  ref,
  gap = 4,
  align,
  justify,
  direction = 'row',
  style,
  children,
  ...rest
}: WrapProps) {
  const wrapStyle: ViewStyle = {
    flexWrap: 'wrap',
    flexDirection: direction,
    gap: resolveSpace(gap),
    alignItems: align,
    justifyContent: justify,
    ...style,
  };

  return (
    <View ref={ref} style={wrapStyle} {...rest}>
      {children}
    </View>
  );
}
