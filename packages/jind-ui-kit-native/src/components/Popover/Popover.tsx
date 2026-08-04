import { useCallback, type ReactNode } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import { useBackHandler } from '../../hooks/useBackHandler';

export interface PopoverProps {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Content rendered inside the popover overlay. */
  content: ReactNode;
  /** The trigger element; pressing it toggles the popover. */
  children: ReactNode;
  /** Additional styles applied to the content card. */
  style?: ViewStyle;
}

/**
 * A modal popover triggered by pressing its child element.
 *
 * Supports both controlled and uncontrolled open state.
 * Closes on backdrop press and Android back button.
 */
export function Popover({
  open,
  defaultOpen,
  onOpenChange,
  content,
  children,
  style,
}: PopoverProps) {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useControllableState<boolean>(
    open,
    defaultOpen ?? false,
    onOpenChange,
  );

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useBackHandler(
    useCallback(() => {
      if (isOpen) {
        close();
        return true;
      }
      return false;
    }, [isOpen, close]),
    isOpen,
  );

  return (
    <>
      <Pressable onPress={toggle} accessibilityRole="button">
        {children}
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={close}
      >
        <Pressable
          style={styles.backdrop}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="Close popover"
        >
          <View
            style={[
              styles.contentCard,
              {
                backgroundColor: theme.semantic.surface.card,
                borderRadius: theme.radius.md,
                padding: theme.space[6],
                ...theme.shadow.menu,
              } as ViewStyle,
              style,
            ]}
            // Prevent press events on the card from closing the popover.
            onStartShouldSetResponder={() => true}
          >
            {content}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  contentCard: {
    maxWidth: '90%',
  },
});
