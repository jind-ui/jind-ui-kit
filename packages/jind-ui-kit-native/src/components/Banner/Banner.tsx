import type { ReactNode, Ref } from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tone } from '../../types';

export interface BannerProps {
  ref?: Ref<View>;
  tone?: Tone;
  children: ReactNode;
  icon?: string;
  action?: ReactNode;
  onDismiss?: () => void;
  style?: ViewStyle;
}

interface ToneColors {
  bg: string;
  text: string;
  border: string;
}

export function Banner({
  ref,
  tone = 'neutral',
  children,
  icon,
  action,
  onDismiss,
  style,
}: BannerProps) {
  const theme = useTheme();

  const toneMap: Record<Tone, ToneColors> = {
    neutral: {
      bg: theme.colors.gray[50],
      text: theme.colors.gray[700],
      border: theme.colors.gray[200],
    },
    primary: {
      bg: theme.colors.blue[50],
      text: theme.colors.blue[700],
      border: theme.colors.blue[200],
    },
    danger: {
      bg: theme.colors.red[50],
      text: theme.colors.red[500],
      border: theme.colors.red[50],
    },
    success: {
      bg: theme.colors.green[50],
      text: theme.colors.green[500],
      border: theme.colors.green[50],
    },
    warning: {
      bg: theme.colors.amber[50],
      text: theme.colors.amber[600],
      border: theme.colors.amber[50],
    },
    info: {
      bg: theme.colors.teal[50],
      text: theme.colors.teal[600],
      border: theme.colors.teal[50],
    },
    accent: {
      bg: theme.colors.purple[50],
      text: theme.colors.purple[500],
      border: theme.colors.purple[50],
    },
    brand: {
      bg: theme.colors.blue[50],
      text: theme.colors.blue[500],
      border: theme.colors.blue[200],
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
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
      accessibilityRole="alert"
    >
      {icon && (
        <Text style={[styles.icon, { color: colors.text }]}>{icon}</Text>
      )}

      <View style={styles.body}>
        <Text
          style={{
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize[14],
            fontWeight: theme.fontWeight.regular,
            lineHeight: theme.fontSize[14] * 1.5,
            color: theme.semantic.text.primary,
          }}
        >
          {children}
        </Text>
      </View>

      {action && <View>{action}</View>}

      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={8}
        >
          <Text style={{ color: colors.text, fontSize: 14, lineHeight: 14, opacity: 0.7 }}>
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
    paddingVertical: 12,
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
