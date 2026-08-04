import { memo, type ReactNode, type Ref } from 'react';
import { Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface CardProps {
  ref?: Ref<View>;
  padding?: number;
  title?: string;
  actions?: ReactNode;
  children?: ReactNode;
  style?: ViewStyle;
}

function CardInner({ ref, padding = 20, title, actions, children, style }: CardProps) {
  const theme = useTheme();

  const cardTitleVariant = theme.typeVariants['card-title'];

  const containerStyle: ViewStyle = {
    backgroundColor: theme.semantic.surface.card,
    borderRadius: theme.radius.md,
    ...theme.shadow.card,
    padding,
    ...style,
  };

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  };

  const titleStyle: TextStyle = {
    fontFamily: cardTitleVariant.fontFamily,
    fontSize: cardTitleVariant.fontSize,
    fontWeight: cardTitleVariant.fontWeight,
    lineHeight: cardTitleVariant.fontSize * cardTitleVariant.lineHeight,
    color: theme.semantic.text.primary,
  };

  return (
    <View ref={ref} style={containerStyle}>
      {title != null && (
        <View style={headerStyle}>
          <Text style={titleStyle}>{title}</Text>
          {actions != null && <View>{actions}</View>}
        </View>
      )}
      {children}
    </View>
  );
}

export const Card = memo(CardInner);
