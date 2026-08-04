import type { Ref, ReactNode } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface IconButtonProps {
  icon: ReactNode;
  variant?: 'tile' | 'ghost';
  tone?: 'default' | 'danger';
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  label?: string;
  onPress?: () => void;
  style?: ViewStyle;
  ref?: Ref<View>;
}

const sizeConfig = {
  lg: { box: 44, icon: 24, radius: 8 },
  md: { box: 40, icon: 20, radius: 5 },
  sm: { box: 28, icon: 18, radius: 5 },
} as const;

export function IconButton({
  ref,
  icon,
  variant = 'tile',
  tone = 'default',
  size = 'md',
  disabled = false,
  label,
  onPress,
  style,
}: IconButtonProps) {
  const theme = useTheme();
  const config = sizeConfig[size];

  const getContainerStyle = (pressed: boolean): ViewStyle => {
    const base: ViewStyle = {
      width: config.box,
      height: config.box,
      borderRadius: config.radius,
      alignItems: 'center',
      justifyContent: 'center',
    };

    if (variant === 'tile') {
      base.backgroundColor = pressed
        ? theme.semantic.surface.pressed
        : theme.semantic.surface.card;
      base.borderWidth = 1;
      base.borderColor = theme.semantic.border.subtle;
      Object.assign(base, theme.shadow.sm);
    } else {
      base.backgroundColor = pressed
        ? theme.semantic.surface.pressed
        : 'transparent';
    }

    if (disabled) {
      base.opacity = 0.5;
    }

    if (style) {
      Object.assign(base, style);
    }

    return base;
  };

  // tone is exposed for consumers to coordinate icon color;
  // we surface it via accessibilityHint so the variable is consumed.
  const accessibilityHint = tone === 'danger' ? 'Danger action' : undefined;

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => getContainerStyle(pressed)}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <View
        style={{
          width: config.icon,
          height: config.icon,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
    </Pressable>
  );
}
