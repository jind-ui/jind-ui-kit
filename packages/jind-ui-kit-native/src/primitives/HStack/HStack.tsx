import type { Ref } from 'react';
import { View } from 'react-native';
import { Stack, type StackProps } from '../Stack/Stack';

export interface HStackProps extends Omit<StackProps, 'direction'> {
  ref?: Ref<View>;
}

export function HStack(props: HStackProps) {
  return <Stack direction="row" align="center" {...props} />;
}
