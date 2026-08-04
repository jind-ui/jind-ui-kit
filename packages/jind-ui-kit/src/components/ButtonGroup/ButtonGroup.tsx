import {
  type CSSProperties,
  type ReactNode,
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import type { ButtonProps } from '../Button/Button';

export interface ButtonGroupProps {
  children: ReactNode;
  size?: 'sm' | 'md';
  variant?: 'primary' | 'secondary';
  orientation?: 'horizontal' | 'vertical';
  attached?: boolean;
  divider?: boolean;
  dividerStyle?: CSSProperties;
  'aria-label'?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

export function ButtonGroup({
  children,
  size,
  variant,
  orientation = 'horizontal',
  attached = true,
  divider = false,
  dividerStyle,
  'aria-label': ariaLabel,
  style,
  ref,
}: ButtonGroupProps) {
  const theme = useTheme();
  const isVertical = orientation === 'vertical';

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    flexDirection: isVertical ? 'column' : 'row',
    gap: attached ? 0 : 8,
    ...style,
  };

  const items = Children.toArray(children).filter(isValidElement);

  const defaultDividerStyle: CSSProperties = isVertical
    ? { width: '100%', height: 1, background: theme.semantic.border.default, flexShrink: 0 }
    : { width: 1, alignSelf: 'stretch', background: theme.semantic.border.default, flexShrink: 0 };

  const result: ReactNode[] = [];

  items.forEach((child, index) => {
    const isFirst = index === 0;
    const isLast = index === items.length - 1;

    const overrideProps: Partial<ButtonProps> = {};
    if (size) overrideProps.size = size;
    if (variant) overrideProps.variant = variant;

    if (attached) {
      const radiusValue = theme.radius.sm;

      let borderRadius: string;
      if (items.length === 1) {
        borderRadius = `${radiusValue}px`;
      } else if (isVertical) {
        borderRadius = isFirst
          ? `${radiusValue}px ${radiusValue}px 0 0`
          : isLast
            ? `0 0 ${radiusValue}px ${radiusValue}px`
            : '0';
      } else {
        borderRadius = isFirst
          ? `${radiusValue}px 0 0 ${radiusValue}px`
          : isLast
            ? `0 ${radiusValue}px ${radiusValue}px 0`
            : '0';
      }

      const borderOverrides: CSSProperties = { borderRadius };

      if (!isFirst) {
        if (isVertical) {
          borderOverrides.borderTopWidth = 0;
          borderOverrides.marginTop = divider ? 0 : -1;
        } else {
          borderOverrides.borderLeftWidth = 0;
          borderOverrides.marginLeft = divider ? 0 : -1;
        }
      }

      if (divider && !isLast) {
        if (isVertical) {
          borderOverrides.borderBottomWidth = 0;
        } else {
          borderOverrides.borderRightWidth = 0;
        }
      }

      overrideProps.style = {
        ...borderOverrides,
        ...(child as ReactElement<ButtonProps>).props.style,
      };
    }

    if (divider && attached && !isFirst) {
      result.push(
        <span
          key={`divider-${index}`}
          aria-hidden="true"
          style={{ ...defaultDividerStyle, ...dividerStyle }}
        />,
      );
    }

    result.push(cloneElement(child as ReactElement<ButtonProps>, { ...overrideProps, key: index }));
  });

  return (
    <div ref={ref} role="group" aria-label={ariaLabel} style={containerStyle}>
      {result}
    </div>
  );
}
