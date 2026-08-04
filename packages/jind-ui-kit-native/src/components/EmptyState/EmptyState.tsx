import { type ReactNode, type Ref } from 'react';
import { Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface EmptyStateAction {
  label: string;
  onPress: () => void;
}

export interface EmptyStateProps {
  ref?: Ref<View>;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: EmptyStateAction;
  style?: ViewStyle;
  testID?: string;
}

export function EmptyState({
  ref,
  icon,
  title,
  subtitle,
  action,
  style,
  testID,
}: EmptyStateProps) {
  const theme = useTheme();

  const containerStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.space[10],
    ...style,
  };

  const iconWrapperStyle: ViewStyle = {
    marginBottom: theme.space[9],
  };

  const titleStyle: TextStyle = {
    fontSize: theme.fontSize[18],
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.primary,
    textAlign: 'center',
  };

  const subtitleStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.secondary,
    textAlign: 'center',
    marginTop: theme.space[4],
    maxWidth: 280,
  };

  const buttonStyle: ViewStyle = {
    backgroundColor: theme.semantic.fill.primary,
    borderRadius: theme.radius.md,
    marginTop: theme.space[10],
    paddingHorizontal: theme.space[8],
    height: theme.controlHeight.md,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const buttonTextStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.inverse,
    textAlign: 'center',
  };

  return (
    <View ref={ref} style={containerStyle} testID={testID}>
      {icon != null && <View style={iconWrapperStyle}>{icon}</View>}
      <Text style={titleStyle}>{title}</Text>
      {subtitle != null && <Text style={subtitleStyle}>{subtitle}</Text>}
      {action != null && (
        <Pressable
          style={buttonStyle}
          onPress={action.onPress}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          <Text style={buttonTextStyle}>{action.label}</Text>
        </Pressable>
      )}
    </View>
  );
}
