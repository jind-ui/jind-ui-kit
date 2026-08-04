import type { Ref } from 'react';
import { Text, View, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tone } from '../../types';

export interface StatusDotProps {
  tone: Tone;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  style?: ViewStyle;
  ref?: Ref<View>;
}

const sizeMap: Record<NonNullable<StatusDotProps['size']>, number> = {
  sm: 8,
  md: 10,
  lg: 12,
};

export function StatusDot({ ref, tone, size = 'md', label, style }: StatusDotProps) {
  const theme = useTheme();
  const px = sizeMap[size];

  const toneColorMap: Record<Tone, string> = {
    info: theme.colors.teal[600],
    warning: theme.colors.amber[500],
    success: theme.colors.green[500],
    danger: theme.colors.red[500],
    accent: theme.colors.purple[500],
    brand: theme.colors.blue[500],
    primary: theme.colors.blue[500],
    neutral: theme.colors.gray[500],
  };

  const wrapperStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    ...style,
  };

  const dotStyle: ViewStyle = {
    width: px,
    height: px,
    borderRadius: px / 2,
    backgroundColor: toneColorMap[tone],
  };

  const captionVariant = theme.typeVariants.caption;
  const labelTextStyle: TextStyle = {
    fontFamily: captionVariant.fontFamily,
    fontSize: captionVariant.fontSize,
    fontWeight: captionVariant.fontWeight,
    lineHeight: captionVariant.fontSize * captionVariant.lineHeight,
    color: theme.semantic.text.primary,
  };

  return (
    <View ref={ref} style={wrapperStyle} accessibilityLabel={label ?? tone}>
      <View style={dotStyle} />
      {label != null && <Text style={labelTextStyle}>{label}</Text>}
    </View>
  );
}
