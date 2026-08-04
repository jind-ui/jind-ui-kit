import { Children, cloneElement, isValidElement, memo, type ReactElement, type ReactNode, type Ref } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface ButtonGroupProps {
  ref?: Ref<View>;
  children: ReactNode;
  size?: 'md' | 'sm';
  variant?: 'primary' | 'secondary';
  orientation?: 'horizontal' | 'vertical';
  attached?: boolean;
  style?: ViewStyle;
}

function ButtonGroupInner({
  ref,
  children,
  size,
  variant,
  orientation = 'horizontal',
  attached = false,
  style,
}: ButtonGroupProps) {
  const theme = useTheme();
  const isHorizontal = orientation === 'horizontal';

  const containerStyle: ViewStyle = {
    flexDirection: isHorizontal ? 'row' : 'column',
    ...style,
  };

  if (!attached) {
    containerStyle.gap = theme.space[3];
  }

  const items = Children.toArray(children).filter(isValidElement);

  return (
    <View ref={ref} style={containerStyle} accessibilityRole="toolbar">
      {items.map((child, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        const overrides: Record<string, unknown> = {};

        if (size != null) {
          overrides.size = size;
        }
        if (variant != null) {
          overrides.variant = variant;
        }

        if (attached) {
          const childStyle: ViewStyle = {};

          if (isHorizontal) {
            if (!isFirst) {
              childStyle.marginLeft = -theme.borderWidth.default;
            }
            if (isFirst) {
              childStyle.borderTopRightRadius = 0;
              childStyle.borderBottomRightRadius = 0;
            } else if (isLast) {
              childStyle.borderTopLeftRadius = 0;
              childStyle.borderBottomLeftRadius = 0;
            } else {
              childStyle.borderRadius = 0;
            }
          } else {
            if (!isFirst) {
              childStyle.marginTop = -theme.borderWidth.default;
            }
            if (isFirst) {
              childStyle.borderBottomLeftRadius = 0;
              childStyle.borderBottomRightRadius = 0;
            } else if (isLast) {
              childStyle.borderTopLeftRadius = 0;
              childStyle.borderTopRightRadius = 0;
            } else {
              childStyle.borderRadius = 0;
            }
          }

          const existingStyle = (child as ReactElement<{ style?: ViewStyle }>).props.style;
          overrides.style = existingStyle
            ? { ...childStyle, ...(existingStyle as ViewStyle) }
            : childStyle;
        }

        return cloneElement(child as ReactElement, overrides);
      })}
    </View>
  );
}

ButtonGroupInner.displayName = 'ButtonGroup';
export const ButtonGroup = memo(ButtonGroupInner);
