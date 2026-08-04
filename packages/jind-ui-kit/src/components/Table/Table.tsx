import {
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

/* ─── Table ─── */

export interface TableProps extends PerCornerRadiusProps {
  children: ReactNode;
  outlined?: boolean;
  radius?: RadiusValue;
  style?: CSSProperties;
  ref?: Ref<HTMLTableElement>;
}

export function Table(
  { children, outlined = true, radius = 'md', radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft, style, ref, ...rest }: TableProps,
) {
  const theme = useTheme();
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const tableStyle: CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    background: theme.semantic.surface.card,
    ...radiusStyle,
    overflow: 'hidden',
    ...style,
  };

  const wrapperStyle: CSSProperties = {
    ...radiusStyle,
    overflow: 'hidden',
    boxShadow: theme.shadow.card,
    border: outlined ? `1px solid ${theme.semantic.border.default}` : undefined,
  };

  return (
    <div style={wrapperStyle}>
      <table ref={ref} style={tableStyle} {...rest}>
        {children}
      </table>
    </div>
  );
}

/* ─── TableHeader ─── */

export interface TableHeaderProps {
  children: ReactNode;
  style?: CSSProperties;
  ref?: Ref<HTMLTableSectionElement>;
}

export function TableHeader(
  { children, style, ref, ...rest }: TableHeaderProps,
) {
  const theme = useTheme();

  const headerRowStyle: CSSProperties = {
    height: 40,
    borderBottom: `1px solid ${theme.semantic.border.default}`,
    ...style,
  };

  return (
    <thead ref={ref} {...rest}>
      <tr style={headerRowStyle}>{children}</tr>
    </thead>
  );
}

/* ─── TableRow ─── */

export interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  ref?: Ref<HTMLTableRowElement>;
}

export function TableRow(
  { children, onClick, style, ref, ...rest }: TableRowProps,
) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  const rowStyle: CSSProperties = {
    height: 56,
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    background: hovered ? theme.semantic.surface.hover : undefined,
    cursor: onClick ? 'pointer' : undefined,
    transition: `background ${theme.duration.fast}ms ${theme.easing.standard}`,
    ...style,
  };

  return (
    <tr
      ref={ref}
      style={rowStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </tr>
  );
}

/* ─── TableCell ─── */

export interface TableCellProps {
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  header?: boolean;
  style?: CSSProperties;
  ref?: Ref<HTMLTableCellElement>;
}

export function TableCell(
  { children, align = 'left', width, header = false, style, ref, ...rest }: TableCellProps,
) {
  const theme = useTheme();
  const variant = header ? theme.typeVariants.label : theme.typeVariants.body;

  const cellStyle: CSSProperties = {
    padding: '0 14px',
    textAlign: align,
    verticalAlign: 'middle',
    width,
    fontFamily: variant.fontFamily,
    fontSize: variant.fontSize,
    fontWeight: header ? theme.fontWeight.medium : variant.fontWeight,
    lineHeight: variant.lineHeight,
    color: header ? theme.semantic.text.muted : theme.semantic.text.primary,
    ...style,
  };

  const Component = header ? 'th' : 'td';

  return (
    <Component
      ref={ref as any}
      style={cellStyle}
      {...(rest as any)}
    >
      {children}
    </Component>
  );
}
