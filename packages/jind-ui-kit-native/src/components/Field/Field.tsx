import { memo, type ReactNode, type Ref } from 'react';
import { Text, View, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface FieldProps {
  ref?: Ref<View>;
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  style?: ViewStyle;
}

function FieldInner({
  ref,
  label,
  hint,
  error,
  children,
  style,
}: FieldProps) {
  const theme = useTheme();

  const labelVariant = theme.typeVariants.label;
  const captionVariant = theme.typeVariants.caption;

  const containerStyle: ViewStyle = {
    flexDirection: 'column',
    gap: theme.fieldLabelGap,
    ...style,
  };

  const labelStyle: TextStyle = {
    fontFamily: labelVariant.fontFamily,
    fontSize: labelVariant.fontSize,
    fontWeight: labelVariant.fontWeight,
    lineHeight: labelVariant.fontSize * labelVariant.lineHeight,
    color: theme.semantic.text.secondary,
  };

  const hintStyle: TextStyle = {
    fontFamily: captionVariant.fontFamily,
    fontSize: captionVariant.fontSize,
    fontWeight: theme.fontWeight.regular,
    lineHeight: captionVariant.fontSize * captionVariant.lineHeight,
    color: theme.semantic.text.muted,
  };

  const errorStyle: TextStyle = {
    fontFamily: captionVariant.fontFamily,
    fontSize: captionVariant.fontSize,
    fontWeight: theme.fontWeight.regular,
    lineHeight: captionVariant.fontSize * captionVariant.lineHeight,
    color: theme.semantic.text.danger,
  };

  const secondaryText = error ?? hint;

  return (
    <View ref={ref} style={containerStyle}>
      {label != null && <Text style={labelStyle}>{label}</Text>}
      {secondaryText != null && (
        <Text style={error != null ? errorStyle : hintStyle}>{secondaryText}</Text>
      )}
      {children}
    </View>
  );
}

export const Field = memo(FieldInner);
