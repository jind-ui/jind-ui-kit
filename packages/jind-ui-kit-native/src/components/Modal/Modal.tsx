import type { Ref, ReactNode } from 'react';
import { useCallback } from 'react';
import {
  Dimensions,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useBackHandler } from '../../hooks/useBackHandler';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  width?: number;
  children: ReactNode;
  footer?: ReactNode;
  style?: ViewStyle;
  ref?: Ref<View>;
}

export function Modal({
  ref,
  open,
  onClose,
  title,
  width,
  children,
  footer,
  style,
}: ModalProps) {
  const theme = useTheme();

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useBackHandler(
    useCallback(() => {
      if (open) {
        handleClose();
        return true;
      }
      return false;
    }, [open, handleClose]),
    open,
  );

  const defaultWidth = Dimensions.get('window').width - 48;
  const cardWidth = width ?? defaultWidth;

  const titleVariant = theme.typeVariants['card-title'];

  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <View style={styles.backdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Close modal"
        />

        {/* Content card */}
        <View
          ref={ref}
          style={[
            styles.card,
            {
              backgroundColor: theme.semantic.surface.card,
              borderRadius: theme.radius.md,
              ...theme.shadow.menu,
              maxHeight: '90%',
              width: cardWidth,
            },
            style,
          ]}
        >
          {/* Header */}
          {(title || onClose) && (
            <View
              style={[
                styles.header,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: theme.semantic.border.subtle,
                },
              ]}
            >
              {title ? (
                <Text
                  style={[
                    styles.title,
                    {
                      color: theme.semantic.text.primary,
                      fontFamily: titleVariant.fontFamily,
                      fontSize: titleVariant.fontSize,
                      fontWeight: titleVariant.fontWeight,
                      lineHeight:
                        titleVariant.fontSize * titleVariant.lineHeight,
                    },
                  ]}
                >
                  {title}
                </Text>
              ) : (
                <View />
              )}
              {onClose && (
                <Pressable
                  onPress={handleClose}
                  style={styles.closeButton}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                >
                  <Text
                    style={{
                      color: theme.semantic.icon.muted,
                      fontSize: 16,
                      lineHeight: 24,
                    }}
                  >
                    {'×'}
                  </Text>
                </Pressable>
              )}
            </View>
          )}

          {/* Body */}
          <View style={styles.body}>{children}</View>

          {/* Footer */}
          {footer && (
            <View
              style={[
                styles.footer,
                {
                  borderTopWidth: 1,
                  borderTopColor: theme.semantic.border.subtle,
                },
              ]}
            >
              {footer}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    flexShrink: 1,
  },
  closeButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: 24,
  },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
