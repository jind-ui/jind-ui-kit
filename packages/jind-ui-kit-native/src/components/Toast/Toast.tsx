import type { ReactNode, Ref } from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tone } from '../../types';

export interface ToastProps {
  tone: Tone;
  icon?: string;
  onDismiss?: () => void;
  children: ReactNode;
  style?: ViewStyle;
  ref?: Ref<View>;
}

interface ToneColors {
  bg: string;
  text: string;
  borderWidth: number;
  borderColor: string;
}

export function Toast({ ref, tone, icon, onDismiss, children, style }: ToastProps) {
  const theme = useTheme();

  const toneMap: Record<Tone, ToneColors> = {
    neutral: {
      bg: theme.colors.gray[50],
      text: theme.colors.gray[700],
      borderWidth: 1,
      borderColor: theme.colors.gray[200],
    },
    primary: {
      bg: theme.colors.blue[50],
      text: theme.colors.blue[700],
      borderWidth: 1,
      borderColor: theme.colors.blue[200],
    },
    danger: {
      bg: theme.colors.red[50],
      text: theme.colors.red[500],
      borderWidth: 0,
      borderColor: 'transparent',
    },
    success: {
      bg: theme.colors.green[50],
      text: theme.colors.green[500],
      borderWidth: 0,
      borderColor: 'transparent',
    },
    warning: {
      bg: theme.colors.amber[50],
      text: theme.colors.amber[600],
      borderWidth: 0,
      borderColor: 'transparent',
    },
    info: {
      bg: theme.colors.teal[50],
      text: theme.colors.teal[600],
      borderWidth: 0,
      borderColor: 'transparent',
    },
    accent: {
      bg: theme.colors.purple[50],
      text: theme.colors.purple[500],
      borderWidth: 0,
      borderColor: 'transparent',
    },
    brand: {
      bg: theme.colors.blue[50],
      text: theme.colors.blue[500],
      borderWidth: 0,
      borderColor: 'transparent',
    },
  };

  const colors = toneMap[tone];

  return (
    <View
      ref={ref}
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderRadius: theme.radius.md,
          ...theme.shadow.card,
          borderWidth: colors.borderWidth,
          borderColor: colors.borderColor,
        },
        style,
      ]}
      accessibilityRole="alert"
    >
      {/* Icon */}
      {icon && (
        <Text style={[styles.icon, { color: colors.text }]}>{icon}</Text>
      )}

      {/* Body */}
      <View style={styles.body}>
        <Text
          style={{
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize[14],
            fontWeight: '400',
            lineHeight: theme.fontSize[14] * 1.5,
            color: theme.semantic.text.primary,
          }}
        >
          {children}
        </Text>
      </View>

      {/* Dismiss */}
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={8}
        >
          <Text style={{ color: colors.text, fontSize: 14, lineHeight: 14 }}>
            {'✕'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 40,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  icon: {
    fontSize: 16,
    lineHeight: 16,
  },
  body: {
    flex: 1,
  },
});
