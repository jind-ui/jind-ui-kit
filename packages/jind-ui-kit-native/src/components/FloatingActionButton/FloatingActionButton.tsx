import { useCallback, useRef, type ReactNode, type Ref } from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface FloatingActionButtonProps {
  ref?: Ref<View>;
  icon: ReactNode;
  label?: string;
  onPress: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'neutral';
  style?: ViewStyle;
  disabled?: boolean;
  testID?: string;
}

const FAB_SIZE: Record<string, number> = {
  sm: 40,
  md: 56,
  lg: 64,
};

export function FloatingActionButton({
  ref,
  icon,
  label,
  onPress,
  position = 'bottom-right',
  size = 'md',
  variant = 'primary',
  style,
  disabled = false,
  testID,
}: FloatingActionButtonProps) {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const diameter = FAB_SIZE[size] ?? FAB_SIZE.md;
  const edgeOffset = theme.space[10]; // 32px

  const handlePressIn = useCallback(() => {
    if (disabled) return;
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      overshootClamping: true,
      damping: 15,
      stiffness: 300,
    }).start();
  }, [disabled, scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      overshootClamping: true,
      damping: 15,
      stiffness: 300,
    }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress();
    }
  }, [disabled, onPress]);

  const isPrimary = variant === 'primary';
  const backgroundColor = isPrimary
    ? theme.semantic.fill.primary
    : theme.semantic.surface.card;
  const textColor = isPrimary
    ? theme.semantic.text.inverse
    : theme.semantic.text.primary;
  const positionStyle: ViewStyle = (() => {
    const base: ViewStyle = {
      position: 'absolute',
      bottom: edgeOffset,
    };
    switch (position) {
      case 'bottom-left':
        return { ...base, left: edgeOffset };
      case 'bottom-center':
        return { ...base, alignSelf: 'center' };
      case 'bottom-right':
      default:
        return { ...base, right: edgeOffset };
    }
  })();

  const isExtended = label != null && label.length > 0;

  const containerStyle: ViewStyle = {
    ...positionStyle,
    backgroundColor,
    ...theme.shadow.menu,
    height: diameter,
    minWidth: diameter,
    borderRadius: isExtended ? theme.radius.full : diameter / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isExtended ? theme.space[8] : 0, // 20px horizontal padding when extended
    gap: isExtended ? theme.space[4] : 0, // 8px gap between icon and label
    opacity: disabled ? 0.4 : 1,
    ...style,
  };

  const labelStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.sans,
    color: textColor,
  };

  return (
    <Animated.View
      ref={ref as Ref<View>}
      style={[containerStyle, { transform: [{ scale: scaleAnim }] }]}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label ?? 'Action button'}
        accessibilityState={{ disabled }}
        testID={testID}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          gap: isExtended ? theme.space[4] : 0,
        }}
      >
        {icon}
        {isExtended && (
          <Text style={labelStyle} numberOfLines={1}>
            {label}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
