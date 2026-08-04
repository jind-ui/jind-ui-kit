import { useEffect, useRef, type Ref } from 'react';
import { Animated, Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface SnackbarProps {
  ref?: Ref<View>;
  visible: boolean;
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  onDismiss: () => void;
  duration?: number;
  position?: 'bottom' | 'top';
  style?: ViewStyle;
}

const SNACKBAR_HEIGHT = 48;

export function Snackbar({
  ref,
  visible,
  message,
  action,
  onDismiss,
  duration = 4000,
  position = 'bottom',
  style,
}: SnackbarProps) {
  const theme = useTheme();
  const translateY = useRef(new Animated.Value(position === 'bottom' ? SNACKBAR_HEIGHT + 40 : -(SNACKBAR_HEIGHT + 40))).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      if (duration > 0) {
        timerRef.current = setTimeout(onDismiss, duration);
      }
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: position === 'bottom' ? SNACKBAR_HEIGHT + 40 : -(SNACKBAR_HEIGHT + 40),
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, duration, onDismiss, position, translateY, opacity]);

  const containerStyle: ViewStyle = {
    position: 'absolute',
    left: 16,
    right: 16,
    ...(position === 'bottom' ? { bottom: 16 } : { top: 16 }),
    minHeight: SNACKBAR_HEIGHT,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.gray[800],
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: action ? 8 : 16,
    ...theme.shadow.card,
    ...style,
  };

  const messageStyle: TextStyle = {
    flex: 1,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    fontFamily: theme.fontFamily.sans,
    color: '#ffffff',
    lineHeight: theme.fontSize[14] * 1.4,
  };

  const actionStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.bold,
    fontFamily: theme.fontFamily.sans,
    color: theme.colors.blue[200],
    paddingHorizontal: 8,
    paddingVertical: 4,
  };

  return (
    <Animated.View
      ref={ref}
      style={[containerStyle, { transform: [{ translateY }], opacity }]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Text style={messageStyle}>{message}</Text>
      {action != null && (
        <Pressable
          onPress={() => {
            action.onPress();
            onDismiss();
          }}
          hitSlop={8}
        >
          <Text style={actionStyle}>{action.label}</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}
