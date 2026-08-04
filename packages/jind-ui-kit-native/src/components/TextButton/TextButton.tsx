import type { ReactNode, Ref } from 'react';
import { Pressable, Text, View, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface TextButtonProps {
  variant: 'plain' | 'link' | 'dropdown' | 'sort';
  disabled?: boolean;
  chevronSide?: 'left' | 'right';
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  ref?: Ref<View>;
}

const variantIcon: Record<string, string> = {
  link: '↗',       // north-east arrow
  dropdown: '▾',   // down-pointing small triangle
  sort: '⇅',       // up-down arrows
};

export function TextButton({
  ref,
  variant,
  disabled = false,
  chevronSide = 'right',
  children,
  onPress,
  style,
}: TextButtonProps) {
  const theme = useTheme();

  const iconChar = variantIcon[variant];

  const getTextColor = (pressed: boolean): string => {
    if (disabled) return theme.semantic.text.muted;
    if (pressed) return theme.semantic.text.secondary;
    return theme.semantic.text.primary;
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    ...style,
  };

  const getTextStyle = (pressed: boolean): TextStyle => ({
    fontFamily: theme.fontFamily.sans,
    fontSize: 14,
    fontWeight: theme.fontWeight.medium,
    lineHeight: 14 * 1.4,
    color: getTextColor(pressed),
  });

  const getIconStyle = (pressed: boolean): TextStyle => ({
    fontFamily: theme.fontFamily.sans,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: getTextColor(pressed),
  });

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={containerStyle}
    >
      {({ pressed }) => (
        <>
          {iconChar != null && chevronSide === 'left' && (
            <Text style={getIconStyle(pressed)}>{iconChar}</Text>
          )}
          <Text style={getTextStyle(pressed)} numberOfLines={1}>
            {children}
          </Text>
          {iconChar != null && chevronSide === 'right' && (
            <Text style={getIconStyle(pressed)}>{iconChar}</Text>
          )}
        </>
      )}
    </Pressable>
  );
}
