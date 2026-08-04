import { useState, useCallback, type ReactNode, type ReactElement } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface TooltipProps {
  /** Content to display inside the tooltip. */
  content: ReactNode;
  /** The element that triggers the tooltip on long press. */
  children: ReactElement;
}

/**
 * A tooltip adapted for mobile: triggers on long press and displays
 * centered overlay content in a dark chip.
 */
export function Tooltip({ content, children }: TooltipProps) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  const captionVariant = theme.typeVariants.caption;
  const computedLineHeight = captionVariant.fontSize * captionVariant.lineHeight;

  return (
    <>
      <Pressable onLongPress={show} accessibilityRole="button">
        {children}
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={hide}
      >
        <Pressable
          style={styles.backdrop}
          onPress={hide}
          accessibilityRole="button"
          accessibilityLabel="Close tooltip"
        >
          <View
            style={[
              styles.tooltipContainer,
              {
                backgroundColor: theme.colors.gray[900],
                borderRadius: theme.radius.xs,
                paddingVertical: 8,
                paddingHorizontal: 12,
                ...theme.shadow.sm,
              } as ViewStyle,
            ]}
          >
            {typeof content === 'string' ? (
              <Text
                style={{
                  fontFamily: captionVariant.fontFamily,
                  fontSize: captionVariant.fontSize,
                  fontWeight: captionVariant.fontWeight,
                  lineHeight: computedLineHeight,
                  color: '#ffffff',
                }}
              >
                {content}
              </Text>
            ) : (
              content
            )}
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
    backgroundColor: 'transparent',
  },
  tooltipContainer: {
    maxWidth: 260,
  },
});
