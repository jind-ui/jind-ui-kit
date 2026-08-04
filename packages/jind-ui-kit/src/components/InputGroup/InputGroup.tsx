import { Children, cloneElement, isValidElement, type CSSProperties, type ReactNode, type ReactElement } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface InputGroupProps {
  children: ReactNode;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

export function InputGroup({
  children,
  leftAddon,
  rightAddon,
  leftElement,
  rightElement,
  size = 'md',
  'aria-label': ariaLabel,
  style,
  ref,
}: InputGroupProps) {
  const theme = useTheme();

  const hasLeftAddon = leftAddon !== undefined && leftAddon !== null;
  const hasRightAddon = rightAddon !== undefined && rightAddon !== null;
  const hasLeftElement = leftElement !== undefined && leftElement !== null;
  const hasRightElement = rightElement !== undefined && rightElement !== null;

  const height = theme.controlHeight[size];

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    position: 'relative',
    width: '100%',
    ...style,
  };

  const addonBase: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.space[6]}px`,
    background: theme.semantic.surface.subtle,
    border: `1px solid ${theme.semantic.border.default}`,
    fontSize: theme.fontSize[14],
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.secondary,
    boxSizing: 'border-box',
    height,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  const leftAddonStyle: CSSProperties = {
    ...addonBase,
    borderRight: 'none',
    borderTopLeftRadius: theme.radius.md,
    borderBottomLeftRadius: theme.radius.md,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  const rightAddonStyle: CSSProperties = {
    ...addonBase,
    borderLeft: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };

  const elementBase: CSSProperties = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.space[6]}px`,
    pointerEvents: 'none',
    color: theme.semantic.text.muted,
    fontSize: theme.fontSize[14],
    zIndex: 1,
  };

  const leftElementStyle: CSSProperties = {
    ...elementBase,
    left: hasLeftAddon ? undefined : 0,
  };

  const rightElementStyle: CSSProperties = {
    ...elementBase,
    right: hasRightAddon ? undefined : 0,
  };

  // Compute extra padding for child input when elements are present
  const elementPadding = theme.space[6] * 2 + 14; // padding + approximate icon width
  const childPaddingLeft = hasLeftElement ? elementPadding : undefined;
  const childPaddingRight = hasRightElement ? elementPadding : undefined;

  // Compute border radius overrides for child
  const childBorderRadius = (() => {
    if (hasLeftAddon && hasRightAddon) return 0;
    if (hasLeftAddon)
      return `0 ${theme.radius.md}px ${theme.radius.md}px 0`;
    if (hasRightAddon)
      return `${theme.radius.md}px 0 0 ${theme.radius.md}px`;
    return undefined;
  })();

  // Clone child to inject style overrides
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    const childStyle: CSSProperties = {
      ...(childBorderRadius !== undefined ? { borderRadius: childBorderRadius } : {}),
      ...(childPaddingLeft !== undefined ? { paddingLeft: childPaddingLeft } : {}),
      ...(childPaddingRight !== undefined ? { paddingRight: childPaddingRight } : {}),
      flex: 1,
      width: '100%',
    };

    return cloneElement(child as ReactElement<{ style?: CSSProperties }>, {
      style: {
        ...((child as ReactElement<{ style?: CSSProperties }>).props.style || {}),
        ...childStyle,
      },
    });
  });

  return (
    <div ref={ref} role="group" aria-label={ariaLabel} style={containerStyle} data-testid="input-group">
      {hasLeftAddon && (
        <div style={leftAddonStyle} data-testid="input-group-left-addon">
          {leftAddon}
        </div>
      )}
      <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
        {hasLeftElement && (
          <div style={leftElementStyle} data-testid="input-group-left-element">
            {leftElement}
          </div>
        )}
        {enhancedChildren}
        {hasRightElement && (
          <div style={rightElementStyle} data-testid="input-group-right-element">
            {rightElement}
          </div>
        )}
      </div>
      {hasRightAddon && (
        <div style={rightAddonStyle} data-testid="input-group-right-addon">
          {rightAddon}
        </div>
      )}
    </div>
  );
}
