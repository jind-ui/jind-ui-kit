import React, { createContext, useContext } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

// ─── Context ─────────────────────────────────────────────────────────
interface TabsContextValue {
  activeValue: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('Tab components must be used within a <Tabs> provider');
  }
  return ctx;
}

// ─── Tabs ────────────────────────────────────────────────────────────
export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ value, defaultValue, onChange, children }: TabsProps) {
  const [activeValue, setActiveValue] = useControllableState<string>(
    value,
    defaultValue ?? '',
    onChange,
  );

  return (
    <TabsContext.Provider value={{ activeValue, onChange: setActiveValue }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.displayName = 'Tabs';

// ─── TabList ─────────────────────────────────────────────────────────
export interface TabListProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function TabList({ children, style }: TabListProps) {
  const theme = useTheme();

  const containerStyle: ViewStyle = {
    ...style,
  };

  const innerStyle: ViewStyle = {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.semantic.border!.subtle,
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={containerStyle}
    >
      <View style={innerStyle}>{children}</View>
    </ScrollView>
  );
}

TabList.displayName = 'TabList';

// ─── Tab ─────────────────────────────────────────────────────────────
export interface TabProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Tab({ value, disabled, children }: TabProps) {
  const theme = useTheme();
  const { activeValue, onChange } = useTabsContext();

  const isActive = activeValue === value;

  const baseStyle: ViewStyle = {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: -1,
    borderBottomWidth: 2,
    borderBottomColor: isActive
      ? theme.semantic.fill!.primary
      : 'transparent',
    opacity: disabled ? 0.5 : 1,
  };

  const textStyle = (pressed: boolean): TextStyle => ({
    fontFamily: theme.fontFamily.sans,
    fontSize: 14,
    fontWeight: theme.fontWeight.medium,
    lineHeight: 21,
    color: isActive
      ? theme.semantic.fill!.primary
      : pressed
        ? theme.semantic.text!.primary
        : theme.semantic.text!.secondary,
  });

  return (
    <Pressable
      style={baseStyle}
      onPress={() => onChange(value)}
      disabled={disabled}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled }}
    >
      {({ pressed }: { pressed: boolean }) => (
        <Text style={textStyle(pressed)}>{children}</Text>
      )}
    </Pressable>
  );
}

Tab.displayName = 'Tab';

// ─── TabPanel ────────────────────────────────────────────────────────
export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
}

export function TabPanel({ value, children }: TabPanelProps) {
  const { activeValue } = useTabsContext();

  if (activeValue !== value) {
    return null;
  }

  const panelStyle: ViewStyle = {
    paddingVertical: 16,
  };

  return <View style={panelStyle}>{children}</View>;
}

TabPanel.displayName = 'TabPanel';
