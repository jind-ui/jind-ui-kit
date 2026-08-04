import { type ElementType } from 'react';
import { Stack, type StackProps } from '../Stack/Stack';

export type HStackProps<E extends ElementType = 'div'> = Omit<StackProps<E>, 'direction'>;

export function HStack(props: HStackProps) {
  return <Stack direction="row" align="center" {...props} />;
}
