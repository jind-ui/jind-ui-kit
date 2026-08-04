import { memo } from 'react';
import { Pressable, Text, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface ChipProps {
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

function ChipInner({
  icon,
  selected = false,
  disabled = false,
  onPress,
  children,
  style,
}: ChipProps) {
  const theme = useTheme();

  const pressableStyle = (pressed: boolean): ViewStyle => {
    const base: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      height: 40,
      paddingHorizontal: 14,
      borderRadius: theme.radius.sm,
      borderWidth: 1,
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    if (selected) {
      return {
        ...base,
        backgroundColor: pressed ? theme.semantic.surface.pressed : theme.colors.blue[50],
        borderColor: theme.colors.blue[500],
      };
    }

    return {
      ...base,
      backgroundColor: pressed ? theme.semantic.surface.pressed : theme.semantic.surface.card,
      borderColor: theme.semantic.border.subtle,
      ...(pressed ? {} : theme.shadow.xs),
    };
  };

  const textColor = selected ? theme.colors.blue[500] : theme.semantic.text.primary;

  const textStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.fontSize[14] * 1.3,
    color: textColor,
  };

  const iconStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    lineHeight: theme.fontSize[14] * 1.3,
    color: textColor,
    marginRight: 6,
  };

  return (
    <Pressable
      style={({ pressed }) => pressableStyle(pressed)}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
    >
      {icon != null && <Text style={iconStyle}>{icon}</Text>}
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}

ChipInner.displayName = 'Chip';

export const Chip = memo(ChipInner);
