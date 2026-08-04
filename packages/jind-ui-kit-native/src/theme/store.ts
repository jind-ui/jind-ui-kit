import { createStore } from 'zustand/vanilla';
import type { JindTheme } from './theme';
import { defaultTheme } from './theme';

export interface ThemeState {
  theme: JindTheme;
  colorMode: 'light' | 'dark';
  setTheme: (theme: JindTheme) => void;
  setColorMode: (mode: 'light' | 'dark') => void;
  toggleColorMode: () => void;
}

export const createThemeStore = (initialTheme?: JindTheme) =>
  createStore<ThemeState>((set) => ({
    theme: initialTheme ?? defaultTheme,
    colorMode: 'light',
    setTheme: (theme) => set({ theme }),
    setColorMode: (colorMode) => set({ colorMode }),
    toggleColorMode: () =>
      set((state) => ({
        colorMode: state.colorMode === 'light' ? 'dark' : 'light',
      })),
  }));

export type ThemeStore = ReturnType<typeof createThemeStore>;
