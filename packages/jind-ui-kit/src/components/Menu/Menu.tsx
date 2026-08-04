import { Children, Fragment, type CSSProperties, type ReactNode, type Ref } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { mergeStyles } from '../../utils/styles';

export interface MenuProps {
  header?: string;
  width?: number | string;
  dividers?: boolean;
  children: ReactNode;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function Menu({ header, width, dividers = false, children, style, ref }: MenuProps) {
  const theme = useTheme();

  const containerStyle: CSSProperties = mergeStyles(
    {
      background: theme.semantic.surface.card,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadow.menu,
      paddingBottom: 6,
      width,
      boxSizing: 'border-box',
    },
    style,
  );

  const headerStyle: CSSProperties = {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 10,
    fontFamily: theme.typeVariants.label.fontFamily,
    fontSize: theme.typeVariants.label.fontSize,
    fontWeight: theme.typeVariants.label.fontWeight,
    lineHeight: theme.typeVariants.label.lineHeight,
    color: theme.semantic.text.muted,
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    marginBottom: 6,
    boxSizing: 'border-box' as const,
  };

  const dividerStyle: CSSProperties = {
    height: 0,
    borderBottom: `1px solid ${theme.semantic.border.default}`,
    marginLeft: 14,
    marginRight: 14,
  };

  const items = Children.toArray(children).filter(Boolean);

  return (
    <div ref={ref} style={containerStyle} role="menu">
      {header && <div style={headerStyle}>{header}</div>}
      {dividers
        ? items.map((child, i) => (
            <Fragment key={i}>
              {child}
              {i < items.length - 1 && <div style={dividerStyle} aria-hidden="true" />}
            </Fragment>
          ))
        : children}
    </div>
  );
}
