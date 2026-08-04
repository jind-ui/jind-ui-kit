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
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useBackHandler } from '../../hooks/useBackHandler';
import { useDimensions } from '../../hooks/useDimensions';

export interface ActionSheetAction {
  /** Label text for the action row. */
  label: string;
  /** Called when the action is pressed. */
  onPress: () => void;
  /** When true the label renders in the danger text color. */
  destructive?: boolean;
  /** Optional icon element rendered before the label. */
  icon?: ReactNode;
}

export interface ActionSheetProps {
  /** Whether the action sheet is visible. */
  isOpen: boolean;
  /** Called when the action sheet should close. */
  onClose: () => void;
  /** The list of actions to display. */
  actions: ActionSheetAction[];
  /** Label for the cancel button. Defaults to "Cancel". */
  cancelLabel?: string;
  /** Optional title displayed at the top of the action group. */
  title?: string;
  /** Optional message displayed below the title. */
  message?: string;
  /** Ref forwarded to the sheet container. */
  ref?: Ref<View>;
}

/**
 * An iOS-style action sheet that slides up from the bottom.
 *
 * Renders a grouped list of actions with a separated cancel button,
 * animated entrance/exit, backdrop dismiss, and Android back handling.
 */
export function ActionSheet({
  ref,
  isOpen,
  onClose,
  actions,
  cancelLabel = 'Cancel',
  title,
  message,
}: ActionSheetProps) {
    const theme = useTheme();
    const { height: screenHeight } = useDimensions();

    const translateY = useRef(new Animated.Value(screenHeight)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    const animateIn = useCallback(() => {
      translateY.setValue(screenHeight);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: theme.duration.base,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: theme.duration.base,
          useNativeDriver: true,
        }),
      ]).start();
    }, [translateY, backdropOpacity, screenHeight, theme.duration.base]);

    const animateOut = useCallback(
      (onFinish?: () => void) => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: screenHeight,
            duration: theme.duration.fast,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 0,
            duration: theme.duration.fast,
            useNativeDriver: true,
          }),
        ]).start(onFinish);
      },
      [translateY, backdropOpacity, screenHeight, theme.duration.fast],
    );

    useEffect(() => {
      if (isOpen) {
        animateIn();
      }
    }, [isOpen, animateIn]);

    const handleClose = useCallback(() => {
      animateOut(onClose);
    }, [animateOut, onClose]);

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

    const handleActionPress = useCallback(
      (action: ActionSheetAction) => {
        animateOut(() => {
          onClose();
          action.onPress();
        });
      },
      [animateOut, onClose],
    );

    const groupRadius = theme.radius.lg;
    const hasHeader = Boolean(title) || Boolean(message);

    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={handleClose}
      >
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleClose}
            accessibilityRole="button"
            accessibilityLabel="Close action sheet"
          />
        </Animated.View>

        {/* Sheet content */}
        <Animated.View
          ref={ref}
          style={[
            styles.container,
            {
              paddingHorizontal: theme.space[4],
              paddingBottom: theme.space[12],
              transform: [{ translateY }],
            },
          ]}
          pointerEvents="box-none"
        >
          {/* Action group */}
          <View
            style={[
              styles.group,
              {
                backgroundColor: theme.semantic.surface.card,
                borderRadius: groupRadius,
                ...theme.shadow.menu,
              },
            ]}
          >
            {/* Header (title / message) */}
            {hasHeader && (
              <View
                style={[
                  styles.header,
                  {
                    borderBottomWidth: theme.borderWidth.default,
                    borderBottomColor: theme.semantic.border.subtle,
                    paddingVertical: theme.space[7],
                    paddingHorizontal: theme.space[8],
                  },
                ]}
              >
                {title ? (
                  <Text
                    style={[
                      styles.titleText,
                      {
                        color: theme.semantic.text.primary,
                        fontSize: theme.fontSize[14],
                        fontWeight: theme.fontWeight.medium,
                        fontFamily: theme.fontFamily.sans,
                      },
                    ]}
                  >
                    {title}
                  </Text>
                ) : null}
                {message ? (
                  <Text
                    style={[
                      styles.messageText,
                      {
                        color: theme.semantic.text.secondary,
                        fontSize: theme.fontSize[13],
                        fontWeight: theme.fontWeight.regular,
                        fontFamily: theme.fontFamily.sans,
                        marginTop: title ? theme.space[2] : 0,
                      },
                    ]}
                  >
                    {message}
                  </Text>
                ) : null}
              </View>
            )}

            {/* Actions */}
            {actions.map((action, index) => {
              const isLast = index === actions.length - 1;
              return (
                <ActionRow
                  key={index}
                  action={action}
                  isLast={isLast}
                  onPress={() => handleActionPress(action)}
                />
              );
            })}
          </View>

          {/* Cancel button */}
          <Pressable
            onPress={handleClose}
            style={({ pressed }) => [
              styles.cancelButton,
              {
                backgroundColor: pressed
                  ? theme.semantic.surface.pressed
                  : theme.semantic.surface.card,
                borderRadius: groupRadius,
                marginTop: theme.space[4],
                ...theme.shadow.card,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
          >
            <Text
              style={[
                styles.cancelText,
                {
                  color: theme.semantic.text.link,
                  fontSize: theme.fontSize[16],
                  fontWeight: theme.fontWeight.bold,
                  fontFamily: theme.fontFamily.sans,
                },
              ]}
            >
              {cancelLabel}
            </Text>
          </Pressable>
        </Animated.View>
      </Modal>
    );
}

// ---------------------------------------------------------------------------
// Internal action row component
// ---------------------------------------------------------------------------

interface ActionRowProps {
  action: ActionSheetAction;
  isLast: boolean;
  onPress: () => void;
}

function ActionRow({ action, isLast, onPress }: ActionRowProps) {
  const theme = useTheme();

  const labelColor = action.destructive
    ? theme.semantic.text.danger
    : theme.semantic.text.link;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionRow,
        {
          backgroundColor: pressed
            ? theme.semantic.surface.pressed
            : 'transparent',
          borderBottomWidth: isLast ? 0 : theme.borderWidth.default,
          borderBottomColor: theme.semantic.border.subtle,
          paddingVertical: theme.space[7],
          paddingHorizontal: theme.space[8],
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={action.label}
    >
      {action.icon ? (
        <View style={[styles.iconContainer, { marginRight: theme.space[4] }]}>
          {action.icon}
        </View>
      ) : null}
      <Text
        style={[
          styles.actionLabel,
          {
            color: labelColor,
            fontSize: theme.fontSize[16],
            fontWeight: theme.fontWeight.medium,
            fontFamily: theme.fontFamily.sans,
          },
        ]}
      >
        {action.label}
      </Text>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  group: {
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
  },
  messageText: {
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    textAlign: 'center',
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  cancelText: {
    textAlign: 'center',
  },
});
