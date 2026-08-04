import { memo } from 'react';
import { Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tone } from '../../types';

export interface ProgressStatProps {
  value?: number;
  total?: number;
  caption?: string;
  tone?: Tone;
  style?: ViewStyle;
}

function getFillColor(
  tone: Tone,
  colors: Record<string, Record<string, string>>,
): string {
  switch (tone) {
    case 'brand':
    case 'primary':
      return colors.blue[500];
    case 'info':
      return colors.teal[600];
    case 'warning':
      return colors.amber[500];
    case 'success':
      return colors.green[500];
    case 'danger':
      return colors.red[500];
    case 'accent':
      return colors.purple[500];
    case 'neutral':
    default:
      return colors.gray[500];
  }
}

function ProgressStatInner({
  value = 0,
  total = 100,
  caption,
  tone = 'primary',
  style,
}: ProgressStatProps) {
  const theme = useTheme();

  const safeTotal = total > 0 ? total : 100;
  const clampedValue = Math.max(0, Math.min(value, safeTotal));
  const fillPercent = clampedValue / safeTotal;

  const fillColor = getFillColor(tone, theme.colors);

  const bodyVariant = theme.typeVariants.body;
  const captionVariant = theme.typeVariants.caption;

  const containerStyle: ViewStyle = {
    ...style,
  };

  const trackStyle: ViewStyle = {
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.gray[200],
    overflow: 'hidden',
    flexDirection: 'row',
  };

  const fillStyle: ViewStyle = {
    flex: fillPercent,
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: fillColor,
  };

  const spacerStyle: ViewStyle = {
    flex: 1 - fillPercent,
  };

  const labelRowStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  };

  const valueTextStyle: TextStyle = {
    fontFamily: bodyVariant.fontFamily,
    fontSize: bodyVariant.fontSize,
    fontWeight: theme.fontWeight.medium,
    lineHeight: bodyVariant.fontSize * bodyVariant.lineHeight,
    color: theme.semantic.text.primary,
  };

  const captionTextStyle: TextStyle = {
    fontFamily: captionVariant.fontFamily,
    fontSize: captionVariant.fontSize,
    fontWeight: captionVariant.fontWeight,
    lineHeight: captionVariant.fontSize * captionVariant.lineHeight,
    color: theme.semantic.text.secondary,
  };

  return (
    <View style={containerStyle}>
      <View style={trackStyle}>
        <View style={fillStyle} />
        <View style={spacerStyle} />
      </View>
      <View style={labelRowStyle}>
        <Text style={valueTextStyle}>
          {value}/{total}
        </Text>
        {caption != null && <Text style={captionTextStyle}>{caption}</Text>}
      </View>
    </View>
  );
}

ProgressStatInner.displayName = 'ProgressStat';

export const ProgressStat = memo(ProgressStatInner);
