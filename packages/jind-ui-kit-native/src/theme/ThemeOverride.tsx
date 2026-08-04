import { createContext, useMemo, type ReactNode } from 'react';
import type { JindTheme } from './theme';
import { useTheme } from './ThemeProvider';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ThemeOverrides = DeepPartial<JindTheme>;

export const ThemeOverrideContext = createContext<JindTheme | null>(null);

export interface ThemeOverrideProps {
  value: ThemeOverrides;
  children: ReactNode;
}

export function ThemeOverride({ value, children }: ThemeOverrideProps) {
  const parentTheme = useTheme();

  const merged = useMemo(
    () => deepMerge(
      parentTheme as unknown as Record<string, unknown>,
      value as unknown as Record<string, unknown>,
    ) as unknown as JindTheme,
    [parentTheme, value],
  );

  return (
    <ThemeOverrideContext.Provider value={merged}>
      {children}
    </ThemeOverrideContext.Provider>
  );
}

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...target };
  for (const key in source) {
    const sourceVal = source[key];
    const targetVal = target[key];
    if (
      sourceVal &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      targetVal &&
      typeof targetVal === 'object' &&
      !Array.isArray(targetVal)
    ) {
      result[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      );
    } else if (sourceVal !== undefined) {
      result[key] = sourceVal;
    }
  }
  return result;
}
