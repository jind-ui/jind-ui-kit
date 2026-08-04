import React from 'react';
import { View, type ViewStyle, type ViewProps } from 'react-native';

const hiddenStyle: ViewStyle = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  opacity: 0,
};

export interface VisuallyHiddenProps extends Omit<ViewProps, 'style'> {
  children: React.ReactNode;
}

export function VisuallyHidden({ children, ...rest }: VisuallyHiddenProps) {
  return (
    <View style={hiddenStyle} {...rest}>
      {children}
    </View>
  );
}
