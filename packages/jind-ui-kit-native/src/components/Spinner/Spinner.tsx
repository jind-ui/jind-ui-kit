import { memo, type Ref } from 'react';
import { ActivityIndicator, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  ref?: Ref<View>;
  size?: SpinnerSize;
  label?: string;
  tone?: 'primary' | 'neutral';
  style?: ViewStyle;
}

const indicatorSizeMap: Record<SpinnerSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
};

function SpinnerInner({
  ref,
  size = 'md',
  label,
  tone = 'primary',
  style,
}: SpinnerProps) {
  const theme = useTheme();

  const color =
    tone === 'primary'
      ? theme.semantic.fill.primary
      : theme.colors.gray[400];

  const containerStyle: ViewStyle = {
    alignItems: 'center',
    gap: 8,
    ...style,
  };

  const labelStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.regular,
    color: theme.semantic.text.muted,
    lineHeight: theme.fontSize[13] * 1.4,
  };

  return (
    <View ref={ref} style={containerStyle} accessibilityRole="progressbar">
      <ActivityIndicator size={indicatorSizeMap[size]} color={color} />
      {label != null && <Text style={labelStyle}>{label}</Text>}
    </View>
  );
}

SpinnerInner.displayName = 'Spinner';

export const Spinner = memo(SpinnerInner);
