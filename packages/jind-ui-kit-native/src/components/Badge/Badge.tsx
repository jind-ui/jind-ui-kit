import React, { memo } from 'react';
import { Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tone } from '../../types';

export interface BadgeProps {
  tone?: Tone;
  dot?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

function getToneColors(
  tone: Tone,
  colors: Record<string, Record<string, string>>,
  semantic: Record<string, Record<string, string>>,
): { bg: string; fg: string } {
  switch (tone) {
    case 'info':
      return { bg: colors.teal[50], fg: colors.teal[600] };
    case 'warning':
      return { bg: colors.amber[50], fg: colors.amber[600] };
    case 'success':
      return { bg: colors.green[50], fg: colors.green[500] };
    case 'danger':
      return { bg: colors.red[50], fg: colors.red[600] };
    case 'accent':
      return { bg: colors.purple[50], fg: colors.purple[500] };
    case 'brand':
    case 'primary':
      return { bg: colors.blue[50], fg: colors.blue[600] };
    case 'neutral':
    default:
      return { bg: semantic.surface.quiet, fg: colors.gray[800] };
  }
}

function BadgeInner({ tone = 'neutral', dot, onDismiss, children, style }: BadgeProps) {
  const theme = useTheme();
  const { bg, fg } = getToneColors(tone, theme.colors, theme.semantic);

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: 26,
    paddingHorizontal: 8,
    borderRadius: theme.radius.xs,
    backgroundColor: bg,
    ...style,
  };

  const textStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.fontSize[13] * 1.3,
    color: fg,
  };

  const dotStyle: ViewStyle = {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: fg,
    marginRight: 6,
  };

  const dismissStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.fontSize[13] * 1.3,
    color: fg,
    marginLeft: 6,
  };

  return (
    <View style={containerStyle} accessibilityRole="text">
      {dot === true && <View style={dotStyle} />}
      <Text style={textStyle}>{children}</Text>
      {onDismiss != null && (
        <Pressable
          onPress={onDismiss}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
        >
          <Text style={dismissStyle}>{'×'}</Text>
        </Pressable>
      )}
    </View>
  );
}

BadgeInner.displayName = 'Badge';

export const Badge = memo(BadgeInner);
