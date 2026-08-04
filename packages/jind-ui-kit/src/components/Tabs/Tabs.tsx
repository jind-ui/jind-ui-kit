import {
  createContext,
  useContext,
  useRef,
  useId,
  useCallback,
  type CSSProperties,
  type ReactNode,
  useState,
  type KeyboardEvent,
} from 'react';
import { useControllableState } from '../../hooks/useControllableState';
import { useTheme } from '../../theme/ThemeProvider';
import { transition } from '../../utils/styles';
import type { PressEffect } from '../../hooks/usePressAnimation';
import type { TabsChangeDetails, TabsChangeReason } from '../../types';

/* ─── Context ─── */

interface TabsContextValue {
  activeValue: string;
  selectTab: (value: string, reason: TabsChangeReason) => void;
  pressEffect: PressEffect;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab components must be used within <Tabs>');
  return ctx;
}

/* ─── Tabs ─── */

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, details?: TabsChangeDetails) => void;
  pressEffect?: PressEffect;
  children: ReactNode;
}

export function Tabs({ value, defaultValue = '', onChange, pressEffect = 'scale', children }: TabsProps) {
  const [activeValue, setActiveValue] = useControllableState(value, defaultValue);
  const baseId = useId();

  const selectTab = useCallback((v: string, reason: TabsChangeReason) => {
    setActiveValue(v);
    onChange?.(v, { reason });
  }, [onChange, setActiveValue]);

  return (
    <TabsContext.Provider value={{ activeValue, selectTab, pressEffect, baseId }}>
      {children}
    </TabsContext.Provider>
  );
}

/* ─── TabList ─── */

export interface TabListProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function TabList({ children, style }: TabListProps) {
  const theme = useTheme();
  const listRef = useRef<HTMLDivElement>(null);
  const { selectTab } = useTabsContext();

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') return;

    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? [],
    );
    if (tabs.length === 0) return;

    const current = tabs.indexOf(e.target as HTMLButtonElement);
    if (current === -1) return;

    e.preventDefault();
    let next: number;

    switch (e.key) {
      case 'ArrowRight':
        next = (current + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        next = (current - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = tabs.length - 1;
        break;
      default:
        return;
    }

    tabs[next].focus();
    const tabValue = tabs[next].dataset.tabValue;
    if (tabValue) selectTab(tabValue, 'keyboard');
  }

  const listStyle: CSSProperties = {
    display: 'flex',
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    gap: 0,
    margin: 0,
    padding: 0,
    ...style,
  };

  return (
    <div role="tablist" ref={listRef} style={listStyle} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
}

/* ─── Tab ─── */

export interface TabProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

export function Tab({ value, disabled = false, children }: TabProps) {
  const theme = useTheme();
  const { activeValue, selectTab, pressEffect, baseId } = useTabsContext();
  const isActive = activeValue === value;
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  function getPressTransform(): string | undefined {
    if (disabled || !pressed || pressEffect === 'none') return undefined;
    switch (pressEffect) {
      case 'scale': return 'scale(0.97)';
      case 'shift': return 'translateY(1px)';
      default: return undefined;
    }
  }

  const textColor = isActive
    ? theme.semantic.fill.primary
    : hovered && !disabled
      ? theme.semantic.text.primary
      : theme.semantic.text.secondary;

  const tabStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 16px',
    border: 'none',
    borderBottom: isActive
      ? `2px solid ${theme.semantic.fill.primary}`
      : '2px solid transparent',
    background: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.lineHeight.normal,
    color: textColor,
    opacity: disabled ? 0.5 : 1,
    marginBottom: -1,
    boxSizing: 'border-box' as const,
    transform: getPressTransform(),
    transition: transition('color', 'border-color', 'transform'),
  };

  return (
    <button
      id={`${baseId}-tab-${value}`}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      data-tab-value={value}
      style={tabStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => { if (!disabled) setPressed(true); }}
      onMouseUp={() => setPressed(false)}
      onClick={() => {
        if (!disabled) selectTab(value, 'click');
      }}
    >
      {children}
    </button>
  );
}

/* ─── TabPanel ─── */

export interface TabPanelProps {
  value: string;
  children: ReactNode;
}

export function TabPanel({ value, children }: TabPanelProps) {
  const { activeValue, baseId } = useTabsContext();
  if (activeValue !== value) return null;

  const panelStyle: CSSProperties = {
    padding: '16px 0',
  };

  return (
    <div
      id={`${baseId}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      style={panelStyle}
    >
      {children}
    </div>
  );
}
