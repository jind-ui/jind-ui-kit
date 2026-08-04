import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { useStore } from 'zustand';
import { createThemeStore, type ThemeState, type ThemeStore } from './store';
import type { JindTheme } from './theme';
import { defaultTheme } from './theme';
import { ThemeOverrideContext } from './ThemeOverride';

const ThemeContext = createContext<ThemeStore | null>(null);

export interface ThemeProviderProps {
  theme?: JindTheme;
  children: ReactNode;
}

export function JindProvider({ theme, children }: ThemeProviderProps) {
  const storeRef = useRef<ThemeStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createThemeStore(theme);
  }

  useEffect(() => {
    if (theme && storeRef.current) {
      storeRef.current.setState({ theme });
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={storeRef.current}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeStore<T>(selector: (state: ThemeState) => T): T {
  const store = useContext(ThemeContext);
  if (!store) {
    throw new Error('useThemeStore must be used within a ThemeProvider');
  }
  return useStore(store, selector);
}

export function useTheme(): JindTheme {
  const override = useContext(ThemeOverrideContext);
  if (override) return override;
  const store = useContext(ThemeContext);
  if (store) {
    return useStore(store, (s) => s.theme);
  }
  return defaultTheme;
}

export function useColorMode() {
  const store = useContext(ThemeContext);
  if (!store) {
    return { colorMode: 'light' as const, setColorMode: () => {}, toggleColorMode: () => {} };
  }
  return useStore(store, (s) => ({
    colorMode: s.colorMode,
    setColorMode: s.setColorMode,
    toggleColorMode: s.toggleColorMode,
  }));
}
