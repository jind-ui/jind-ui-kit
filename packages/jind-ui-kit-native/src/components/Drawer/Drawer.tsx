import { useCallback, type ReactNode, type Ref } from 'react';
import {
  Dimensions,
  Modal as RNModal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useBackHandler } from '../../hooks/useBackHandler';

export interface DrawerProps {
  ref?: Ref<View>;
  open: boolean;
  onClose?: () => void;
  placement?: 'left' | 'right' | 'bottom';
  width?: number;
  height?: number;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  style?: ViewStyle;
}

export function Drawer({
  ref,
  open,
  onClose,
  placement = 'right',
  width,
  height,
  title,
  children,
  footer,
  style,
}: DrawerProps) {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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

  const isHorizontal = placement === 'left' || placement === 'right';
  const panelWidth = width ?? Math.round(windowWidth * 0.85);
  const panelHeight = height ?? Math.round(windowHeight * 0.5);

  const panelPosition: ViewStyle = isHorizontal
    ? {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: panelWidth,
        ...(placement === 'left' ? { left: 0 } : { right: 0 }),
      }
    : {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: panelHeight,
        borderTopLeftRadius: theme.radius.md,
        borderTopRightRadius: theme.radius.md,
      };

  const panelStyle: ViewStyle = {
    ...panelPosition,
    backgroundColor: theme.semantic.surface.card,
    ...theme.shadow.menu,
    flexDirection: 'column',
    ...style,
  };

  return (
    <RNModal
      visible={open}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Close drawer"
        />
        <View ref={ref} style={panelStyle}>
          {title != null && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: theme.space[7],
                paddingHorizontal: theme.space[8],
                borderBottomWidth: 1,
                borderBottomColor: theme.semantic.border.subtle,
              }}
            >
              <Text
                style={{
                  fontFamily: theme.fontFamily.sans,
                  fontSize: theme.fontSize[16],
                  fontWeight: theme.fontWeight.bold,
                  lineHeight: theme.fontSize[16] * 1.3,
                  color: theme.semantic.text.primary,
                }}
              >
                {title}
              </Text>
              {onClose != null && (
                <Pressable
                  onPress={handleClose}
                  style={styles.closeButton}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                >
                  <Text
                    style={{
                      fontSize: 20,
                      lineHeight: 32,
                      color: theme.semantic.icon.default,
                    }}
                  >
                    {'×'}
                  </Text>
                </Pressable>
              )}
            </View>
          )}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: theme.space[8] }}
          >
            {children}
          </ScrollView>
          {footer != null && (
            <View
              style={{
                paddingVertical: theme.space[7],
                paddingHorizontal: theme.space[8],
                borderTopWidth: 1,
                borderTopColor: theme.semantic.border.subtle,
              }}
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
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
