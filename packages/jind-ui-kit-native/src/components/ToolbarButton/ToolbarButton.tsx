import { Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface ToolbarButtonProps {
  name: string;
  active?: boolean;
  disabled?: boolean;
  label?: string;
  accent?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export function ToolbarButton({
  name,
  active,
  disabled,
  label,
  accent,
  onPress,
  style,
}: ToolbarButtonProps) {
  const theme = useTheme();

  const activeColor = accent ?? theme.semantic.fill!.primary;

  const iconColor = disabled
    ? theme.semantic.icon!.muted
    : active
      ? activeColor
      : theme.semantic.icon!.default;

  const containerStyle = (pressed: boolean): ViewStyle => ({
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.sm,
    backgroundColor: pressed ? theme.semantic.surface!.pressed : 'transparent',
    ...style,
  });

  const iconStyle: TextStyle = {
    fontSize: 18,
    color: iconColor,
  };

  const activeBarStyle: ViewStyle = {
    position: 'absolute',
    bottom: 2,
    width: 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: activeColor,
    alignSelf: 'center',
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: active, disabled }}
    >
      {({ pressed }: { pressed: boolean }) => (
        <View style={containerStyle(pressed)}>
          <Text style={iconStyle}>{name}</Text>
          {active && <View style={activeBarStyle} />}
        </View>
      )}
    </Pressable>
  );
}

ToolbarButton.displayName = 'ToolbarButton';
