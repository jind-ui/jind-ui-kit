import {
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition } from '../../utils/styles';

/* ─── Types ─── */

export interface SidebarItem {
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: string | number;
  children?: SidebarItem[];
  disabled?: boolean;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  header?: ReactNode;
  footer?: ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  width?: number;
  collapsedWidth?: number;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

/* ─── Internal sub-components ─── */

function SidebarTooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const wrapperStyle: CSSProperties = {
    position: 'relative',
  };

  const tooltipStyle: CSSProperties = {
    position: 'absolute',
    left: 'calc(100% + 8px)',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: theme.colors.gray[900],
    color: '#ffffff',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.medium,
    lineHeight: 1.3,
    borderRadius: theme.radius.xs,
    padding: '8px 12px',
    boxShadow: theme.shadow.sm,
    whiteSpace: 'nowrap',
    zIndex: 1000,
    pointerEvents: 'none',
  };

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <div role="tooltip" style={tooltipStyle}>{label}</div>}
    </div>
  );
}

function NavItem({
  item,
  collapsed,
  isSubItem = false,
}: {
  item: SidebarItem;
  collapsed: boolean;
  isSubItem?: boolean;
}) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  const itemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.space[4]}px ${theme.space[6]}px`,
    paddingLeft: isSubItem ? theme.space[9] : theme.space[6],
    margin: `0 ${theme.space[1]}px`,
    borderRadius: theme.radius.md,
    background: item.active
      ? theme.semantic.surface.selected
      : hovered
        ? theme.semantic.surface.hover
        : 'transparent',
    color: item.active
      ? theme.semantic.fill.primary
      : theme.semantic.text.primary,
    fontFamily: theme.fontFamily.sans,
    fontSize: isSubItem ? theme.fontSize[13] : theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: 1.4,
    textDecoration: 'none',
    border: 'none',
    width: `calc(100% - ${theme.space[1] * 2}px)`,
    boxSizing: 'border-box',
    cursor: item.disabled ? 'default' : 'pointer',
    opacity: item.disabled ? 0.5 : 1,
    pointerEvents: item.disabled ? 'none' : undefined,
    transition: transition('background-color', 'color'),
    gap: theme.space[6],
    justifyContent: collapsed ? 'center' : 'flex-start',
  };

  const iconStyle: CSSProperties = {
    fontSize: 20,
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: item.active
      ? theme.semantic.fill.primary
      : theme.semantic.icon.default,
    lineHeight: 1,
  };

  const labelStyle: CSSProperties = {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const badgeStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    minWidth: 20,
    padding: '0 6px',
    borderRadius: theme.radius.full,
    backgroundColor: theme.semantic.surface.quiet,
    color: theme.colors.gray[700],
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    fontWeight: theme.fontWeight.medium,
    lineHeight: 1,
    boxSizing: 'border-box',
    flexShrink: 0,
  };

  const chevronStyle: CSSProperties = {
    fontSize: 12,
    color: theme.semantic.text.muted,
    transition: transition('transform'),
    transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
    flexShrink: 0,
    lineHeight: 1,
  };

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    }
    item.onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const content = (
    <div
      style={itemStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={item.disabled ? -1 : 0}
      aria-disabled={item.disabled}
      aria-expanded={hasChildren ? expanded : undefined}
    >
      {item.icon && <span style={iconStyle}>{item.icon}</span>}
      {!collapsed && (
        <>
          <span style={labelStyle}>{item.label}</span>
          {item.badge !== undefined && (
            <span style={badgeStyle}>{item.badge}</span>
          )}
          {hasChildren && <span style={chevronStyle}>{'>'}</span>}
        </>
      )}
    </div>
  );

  const wrappedContent = item.href ? (
    <a href={item.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      {content}
    </a>
  ) : (
    content
  );

  return (
    <div>
      {collapsed ? (
        <SidebarTooltip label={item.label}>{wrappedContent}</SidebarTooltip>
      ) : (
        wrappedContent
      )}
      {!collapsed && hasChildren && expanded && (
        <div>
          {item.children!.map((child, idx) => (
            <NavItem
              key={child.label + idx}
              item={child}
              collapsed={false}
              isSubItem
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Sidebar ─── */

export function Sidebar({
  sections,
  header,
  footer,
  collapsed = false,
  onCollapsedChange,
  width = 260,
  collapsedWidth = 64,
  style,
  ref,
}: SidebarProps) {
  const theme = useTheme();

  const currentWidth = collapsed ? collapsedWidth : width;

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: currentWidth,
    minWidth: currentWidth,
    height: '100%',
    background: theme.semantic.surface.card,
    borderRight: `1px solid ${theme.semantic.border.default}`,
    boxSizing: 'border-box',
    transition: transition('width', 'min-width'),
    overflow: 'hidden',
    ...style,
  };

  const headerStyle: CSSProperties = {
    padding: theme.space[7],
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    flexShrink: 0,
  };

  const sectionTitleStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    fontWeight: theme.fontWeight.semibold,
    color: theme.semantic.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    padding: `0 ${theme.space[6]}px`,
    marginTop: theme.space[7],
    marginBottom: theme.space[2],
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  const navStyle: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: `${theme.space[4]}px 0`,
  };

  const footerStyle: CSSProperties = {
    marginTop: 'auto',
    borderTop: `1px solid ${theme.semantic.border.subtle}`,
    padding: theme.space[7],
    flexShrink: 0,
  };

  const collapseButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 36,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: theme.semantic.text.muted,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    padding: 0,
    borderTop: `1px solid ${theme.semantic.border.subtle}`,
    transition: transition('color'),
    flexShrink: 0,
  };

  return (
    <div ref={ref} style={containerStyle} role="navigation">
      {header && <div style={headerStyle}>{header}</div>}

      <div style={navStyle} role="menu">
        {sections.map((section, sIdx) => (
          <div key={section.title ?? sIdx}>
            {section.title && !collapsed && (
              <div style={sectionTitleStyle}>{section.title}</div>
            )}
            {section.items.map((item, iIdx) => (
              <NavItem
                key={item.label + iIdx}
                item={item}
                collapsed={collapsed}
              />
            ))}
          </div>
        ))}
      </div>

      {footer && <div style={footerStyle}>{footer}</div>}

      {onCollapsedChange && (
        <button
          type="button"
          style={collapseButtonStyle}
          onClick={() => onCollapsedChange(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      )}
    </div>
  );
}
