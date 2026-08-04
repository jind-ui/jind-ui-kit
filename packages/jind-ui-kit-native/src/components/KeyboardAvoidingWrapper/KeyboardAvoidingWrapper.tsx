import type { Ref, ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  type ViewStyle,
} from 'react-native';

export interface KeyboardAvoidingWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
  offset?: number;
  ref?: Ref<KeyboardAvoidingView>;
}

const defaultStyle: ViewStyle = {
  flex: 1,
};

export function KeyboardAvoidingWrapper({
  ref,
  children,
  style,
  offset = 0,
}: KeyboardAvoidingWrapperProps) {
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <KeyboardAvoidingView
      ref={ref}
      behavior={behavior}
      keyboardVerticalOffset={offset}
      style={[defaultStyle, style]}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
