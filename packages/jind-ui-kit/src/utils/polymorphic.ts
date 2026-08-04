import type { ElementType } from 'react';
import type { PolymorphicProps } from '../types';

export function resolveAs<E extends ElementType>(
  as: E | undefined,
  fallback: ElementType,
): ElementType {
  return as ?? fallback;
}

export type { PolymorphicProps };
