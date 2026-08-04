import { type ElementType } from 'react';
import { Stack, type StackProps } from '../Stack/Stack';

export type VStackProps<E extends ElementType = 'div'> = Omit<StackProps<E>, 'direction'>;

export function VStack(props: VStackProps) {
  return <Stack direction="column" {...props} />;
}
