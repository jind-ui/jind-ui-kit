import type { Ref } from 'react';
import { View } from 'react-native';
import { Stack, type StackProps } from '../Stack/Stack';

export interface VStackProps extends Omit<StackProps, 'direction'> {
  ref?: Ref<View>;
}

export function VStack(props: VStackProps) {
  return <Stack direction="column" {...props} />;
}
