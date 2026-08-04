import { defaultTheme } from 'jind-ui-kit';
import { earthyTheme } from './earthy';
import { neonTheme } from './neon';

export const themes = {
  default: { label: 'Default', theme: defaultTheme },
  earthy: { label: 'Earthy', theme: earthyTheme },
  neon: { label: 'Neon', theme: neonTheme },
} as const;

export type ThemeKey = keyof typeof themes;
