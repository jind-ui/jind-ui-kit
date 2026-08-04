import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type Ref,
} from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useBackHandler } from '../../hooks/useBackHandler';
import { useDimensions } from '../../hooks/useDimensions';

export interface BottomSheetProps {
  /** Whether the bottom sheet is visible. */
  isOpen: boolean;
  /** Called when the sheet should close (backdrop tap, drag dismiss, back button). */
  onClose: () => void;
  /** Snap points as fractions of screen height (0-1), sorted ascending. */
  snapPoints: number[];
  /** Content rendered inside the sheet. */
  children: ReactNode;
  /** Optional additional style applied to the sheet container. */
  style?: ViewStyle;
  /** Ref forwarded to the sheet container. */
  ref?: Ref<View>;
}

/**
 * A modal bottom sheet that slides up from the bottom edge.
 *
 * Supports multiple snap points, gesture-driven dragging via PanResponder,
 * backdrop dismiss, and Android hardware back button.
 */
export function BottomSheet({ ref, isOpen, onClose, snapPoints, children, style }: BottomSheetProps) {
    const theme = useTheme();
    const { height: screenHeight } = useDimensions();

    // Sort snap points ascending so index 0 is smallest (least open).
    const sortedSnaps = [...snapPoints].sort((a, b) => a - b);

    // Pixel heights for each snap point (distance from bottom of screen).
    const snapHeights = sortedSnaps.map((fraction) => fraction * screenHeight);

    // The initial snap is the first (smallest) snap point.
    const initialHeight = snapHeights[0] ?? screenHeight * 0.4;

    // translateY: 0 = fully visible at snap height, screenHeight = off-screen below.
    const translateY = useRef(new Animated.Value(screenHeight)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    // Track the current snap height so the pan responder knows where we started.
    const currentSnapHeight = useRef(initialHeight);

    const animateTo = useCallback(
      (toValue: number, onFinish?: () => void) => {
        Animated.timing(translateY, {
          toValue,
          duration: theme.duration.base,
          useNativeDriver: true,
        }).start(onFinish);
      },
      [translateY, theme.duration.base],
    );

    const animateBackdrop = useCallback(
      (toValue: number) => {
        Animated.timing(backdropOpacity, {
          toValue,
          duration: theme.duration.base,
          useNativeDriver: true,
        }).start();
      },
      [backdropOpacity, theme.duration.base],
    );

    // Open / close animation
    useEffect(() => {
      if (isOpen) {
        // Reset to first snap point
        currentSnapHeight.current = initialHeight;
        // Start off-screen, then animate up.
        translateY.setValue(screenHeight);
        const targetY = screenHeight - initialHeight;
        animateTo(targetY);
        animateBackdrop(1);
      } else {
        animateTo(screenHeight);
        animateBackdrop(0);
      }
    }, [isOpen, screenHeight, initialHeight, translateY, animateTo, animateBackdrop]);

    const handleClose = useCallback(() => {
      animateTo(screenHeight, onClose);
      animateBackdrop(0);
    }, [animateTo, animateBackdrop, screenHeight, onClose]);

    // Android back button
    useBackHandler(
      useCallback(() => {
        if (isOpen) {
          handleClose();
          return true;
        }
        return false;
      }, [isOpen, handleClose]),
      isOpen,
    );

    // ---------- PanResponder for drag gesture ----------
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_evt, gestureState) =>
          Math.abs(gestureState.dy) > 5,

        onPanResponderMove: (_evt, gestureState) => {
          // gestureState.dy > 0 = dragging down (closing direction)
          const baseY = screenHeight - currentSnapHeight.current;
          const newY = Math.max(0, baseY + gestureState.dy);
          translateY.setValue(newY);
        },

        onPanResponderRelease: (_evt, gestureState) => {
          // Compute the visible height the user dragged to.
          const baseY = screenHeight - currentSnapHeight.current;
          const finalY = baseY + gestureState.dy;
          const draggedHeight = screenHeight - finalY;

          // If dragged below the smallest snap point, dismiss.
          const smallestSnap = snapHeights[0] ?? 0;
          if (draggedHeight < smallestSnap * 0.5) {
            handleClose();
            return;
          }

          // Find nearest snap point.
          let nearestSnap = smallestSnap;
          let nearestDist = Math.abs(draggedHeight - smallestSnap);
          for (const snap of snapHeights) {
            const dist = Math.abs(draggedHeight - snap);
            if (dist < nearestDist) {
              nearestDist = dist;
              nearestSnap = snap;
            }
          }

          currentSnapHeight.current = nearestSnap;
          const targetY = screenHeight - nearestSnap;
          animateTo(targetY);
        },
      }),
    ).current;

    const handleColor = theme.semantic.border.default;

    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={handleClose}
      >
        {/* Backdrop */}
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: backdropOpacity },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleClose}
            accessibilityRole="button"
            accessibilityLabel="Close bottom sheet"
          />
        </Animated.View>

        {/* Sheet */}
        <Animated.View
          ref={ref}
          style={[
            styles.sheet,
            {
              backgroundColor: theme.semantic.surface.card,
              borderTopLeftRadius: theme.radius.lg,
              borderTopRightRadius: theme.radius.lg,
              ...theme.shadow.menu,
              transform: [{ translateY }],
            },
            style,
          ]}
        >
          {/* Drag handle */}
          <View style={styles.handleArea} {...panResponder.panHandlers}>
            <View
              style={[
                styles.handle,
                {
                  backgroundColor: handleColor,
                  borderRadius: theme.radius.full,
                },
              ]}
            />
          </View>

          {/* Content */}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </Modal>
    );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // The sheet extends to the bottom of the screen so the translate
    // can push it off-screen. Height is controlled by the snap point.
    height: '100%',
  },
  handleArea: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  handle: {
    width: 36,
    height: 4,
  },
  content: {
    flex: 1,
  },
});
