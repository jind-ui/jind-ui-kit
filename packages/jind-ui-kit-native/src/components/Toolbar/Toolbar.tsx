import React, { createContext, useContext } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

// ─── Context ─────────────────────────────────────────────────────────
interface ToolbarContextValue {
  activeValue: string | undefined;
  onChange: (value: string) => void;
}

const ToolbarContext = createContext<ToolbarContextValue | null>(null);

export function useToolbarContext(): ToolbarContextValue | null {
  return useContext(ToolbarContext);
}

// ─── Toolbar ─────────────────────────────────────────────────────────
export interface ToolbarProps {
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Toolbar({ value, onChange, children, style }: ToolbarProps) {
  const theme = useTheme();

  const handleChange = (name: string) => {
    onChange?.(name);
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.semantic.border!.subtle,
    ...style,
  };

  const mapped = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const childProps = child.props as Record<string, unknown>;
    const name = childProps.name as string | undefined;

    if (name) {
      return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
        active: value === name,
        onPress: () => handleChange(name),
      });
    }

    return child;
  });

  return (
    <ToolbarContext.Provider value={{ activeValue: value, onChange: handleChange }}>
      <View style={containerStyle}>{mapped}</View>
    </ToolbarContext.Provider>
  );
}

Toolbar.displayName = 'Toolbar';
