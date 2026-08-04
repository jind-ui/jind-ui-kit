import { useCallback, useRef } from 'react';
import type { ReactNode, Ref } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
  type PanResponderGestureState,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface SwipeAction {
  label: string;
  color: string;
  onPress: () => void;
  icon?: ReactNode;
}

export interface SwipeableRowProps {
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  children: ReactNode;
  actionWidth?: number;
  overshootFriction?: number;
  style?: ViewStyle;
  testID?: string;
  ref?: Ref<View>;
}

export function SwipeableRow({
  ref,
  leftActions,
  rightActions,
  children,
  actionWidth = 80,
  overshootFriction = 8,
  style,
  testID,
}: SwipeableRowProps) {
  const theme = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const startX = useRef(0);

  const leftWidth = (leftActions?.length ?? 0) * actionWidth;
  const rightWidth = (rightActions?.length ?? 0) * actionWidth;

  const clamp = useCallback(
    (value: number): number => {
      const maxRight = leftWidth;
      const maxLeft = -rightWidth;

      if (value > maxRight) {
        const overshoot = value - maxRight;
        return maxRight + overshoot / overshootFriction;
      }
      if (value < maxLeft) {
        const overshoot = maxLeft - value;
        return maxLeft - overshoot / overshootFriction;
      }
      return value;
    },
    [leftWidth, rightWidth, overshootFriction],
  );

  const snapTo = useCallback(
    (toValue: number) => {
      Animated.spring(translateX, {
        toValue,
        useNativeDriver: true,
        overshootClamping: true,
        damping: 20,
        stiffness: 200,
      }).start();
    },
    [translateX],
  );

  const handleActionPress = useCallback(
    (action: SwipeAction) => {
      snapTo(0);
      // Delay onPress so the close animation is visible
      setTimeout(() => {
        action.onPress();
      }, theme.duration.base);
    },
    [snapTo, theme.duration.base],
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (
        _e: GestureResponderEvent,
        gs: PanResponderGestureState,
      ) => Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),

      onPanResponderGrant: () => {
        translateX.stopAnimation((value) => {
          startX.current = value;
        });
      },

      onPanResponderMove: (
        _e: GestureResponderEvent,
        gs: PanResponderGestureState,
      ) => {
        let raw = startX.current + gs.dx;

        // Prevent swiping in a direction with no actions
        if (!leftActions?.length && raw > 0) {
          raw = 0;
        }
        if (!rightActions?.length && raw < 0) {
          raw = 0;
        }

        translateX.setValue(clamp(raw));
      },

      onPanResponderRelease: (
        _e: GestureResponderEvent,
        gs: PanResponderGestureState,
      ) => {
        const current = startX.current + gs.dx;

        // Threshold: 40% of total action width
        if (current > 0 && leftWidth > 0) {
          const threshold = leftWidth * 0.4;
          snapTo(current >= threshold ? leftWidth : 0);
        } else if (current < 0 && rightWidth > 0) {
          const threshold = rightWidth * 0.4;
          snapTo(current <= -threshold ? -rightWidth : 0);
        } else {
          snapTo(0);
        }
      },
    }),
  ).current;

  const actionsContainerBase: ViewStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'stretch',
  };

  const actionButtonStyle: ViewStyle = {
    width: actionWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.space[2],
  };

  const actionLabelStyle: TextStyle = {
    fontSize: theme.fontSize[12],
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.sans,
    color: '#ffffff',
    marginTop: theme.space[1],
  };

  return (
    <View ref={ref} style={[{ overflow: 'hidden' }, style]} testID={testID}>
      {/* Left actions (revealed when swiping right) */}
      {leftActions && leftActions.length > 0 && (
        <View style={[actionsContainerBase, { left: 0 }]}>
          {leftActions.map((action) => (
            <Pressable
              key={action.label}
              style={[actionButtonStyle, { backgroundColor: action.color }]}
              onPress={() => handleActionPress(action)}
              accessibilityRole="button"
              accessibilityLabel={action.label}
            >
              {action.icon != null && action.icon}
              <Text style={actionLabelStyle} numberOfLines={1}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Right actions (revealed when swiping left) */}
      {rightActions && rightActions.length > 0 && (
        <View style={[actionsContainerBase, { right: 0 }]}>
          {rightActions.map((action) => (
            <Pressable
              key={action.label}
              style={[actionButtonStyle, { backgroundColor: action.color }]}
              onPress={() => handleActionPress(action)}
              accessibilityRole="button"
              accessibilityLabel={action.label}
            >
              {action.icon != null && action.icon}
              <Text style={actionLabelStyle} numberOfLines={1}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Foreground (children) */}
      <Animated.View
        style={{
          transform: [{ translateX }],
          backgroundColor: theme.semantic.surface.card,
        }}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
}
