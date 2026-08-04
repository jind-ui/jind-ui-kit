import { type ReactNode, type Ref } from 'react';
import { Pressable, Text, View, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface ButtonProps {
  ref?: Ref<View>;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  children?: ReactNode;
  style?: ViewStyle;
}

const sizeConfig = {
  md: { height: 44, paddingX: 22, iconSize: 20 },
  sm: { height: 32, paddingX: 14, iconSize: 16 },
} as const;

export function Button({
  ref,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  disabled = false,
  fullWidth = false,
  onPress,
  children,
  style,
}: ButtonProps) {
  const theme = useTheme();
  const config = sizeConfig[size];

  const hasChildren = children != null;
  const hasIcon = iconLeft != null || iconRight != null;
  const iconOnly = !hasChildren && hasIcon;

  const getContainerStyle = (pressed: boolean): ViewStyle => {
    const base: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: config.height,
      borderRadius: theme.radius.md,
      gap: 10,
    };

    if (iconOnly) {
      base.width = config.height;
      base.paddingHorizontal = 0;
    } else {
      base.paddingHorizontal = config.paddingX;
    }

    if (fullWidth) {
      base.width = '100%';
    }

    if (variant === 'primary') {
      if (disabled) {
        base.backgroundColor = theme.semantic.fill.disabled;
      } else if (pressed) {
        base.backgroundColor = theme.semantic.fill.primaryActive;
      } else {
        base.backgroundColor = theme.semantic.fill.primary;
      }
      base.borderWidth = 1;
      base.borderColor = 'transparent';
    } else {
      base.backgroundColor = pressed
        ? theme.semantic.surface.pressed
        : theme.semantic.surface.card;
      base.borderWidth = 1;
      base.borderColor = theme.semantic.border.subtle;
      Object.assign(base, theme.shadow.xs);

      if (disabled) {
        base.opacity = 0.5;
      }
    }

    if (style) {
      Object.assign(base, style);
    }

    return base;
  };

  const textStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.typeVariants.control.fontSize,
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.typeVariants.control.fontSize * 1.2,
    color:
      variant === 'primary'
        ? theme.semantic.text.inverse
        : theme.semantic.text.primary,
  };

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => getContainerStyle(pressed)}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {iconLeft != null && (
        <View style={{ width: config.iconSize, height: config.iconSize }}>
          {iconLeft}
        </View>
      )}
      {hasChildren && (
        <Text style={textStyle} numberOfLines={1}>
          {children}
        </Text>
      )}
      {iconRight != null && (
        <View style={{ width: config.iconSize, height: config.iconSize }}>
          {iconRight}
        </View>
      )}
    </Pressable>
  );
}
