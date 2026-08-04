import {
  useState,
  useRef,
  useCallback,
  type CSSProperties,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles } from '../../utils/styles';

export interface NavMenuItem {
  label: string;
  href?: string;
  children?: NavMenuItem[];
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export interface NavigationMenuProps {
  items: NavMenuItem[];
  style?: CSSProperties;
  ref?: Ref<HTMLElement>;
}

function NavigationMenuDropdown({
  items,
}: {
  items: NavMenuItem[];
}) {
  const theme = useTheme();

  const panelStyle: CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: 2,
    background: theme.semantic.surface.card,
    border: `1px solid ${theme.semantic.border.default}`,
    boxShadow: theme.shadow.menu,
    borderRadius: theme.radius.md,
    padding: theme.space[4],
    zIndex: 1000,
    minWidth: 220,
    boxSizing: 'border-box',
  };

  return (
    <div style={panelStyle} role="menu">
      {items.map((item, index) => (
        <NavigationDropdownItem key={index} item={item} />
      ))}
    </div>
  );
}

function NavigationDropdownItem({ item }: { item: NavMenuItem }) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  const itemStyle: CSSProperties = {
    display: 'block',
    padding: `${theme.space[4]}px ${theme.space[6]}px`,
    borderRadius: theme.radius.sm,
    background: hovered && !item.disabled ? theme.semantic.surface.hover : 'transparent',
    cursor: item.disabled ? 'default' : 'pointer',
    opacity: item.disabled ? 0.5 : 1,
    pointerEvents: item.disabled ? 'none' : undefined,
    textDecoration: 'none',
    color: 'inherit',
    transition: transition('background-color'),
    boxSizing: 'border-box',
  };

  const labelStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    color: theme.semantic.text.primary,
    lineHeight: 1.4,
  };

  const descriptionStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    color: theme.semantic.text.secondary,
    lineHeight: 1.4,
    marginTop: 2,
  };

  const content = (
    <>
      <div style={labelStyle}>{item.label}</div>
      {item.description && <div style={descriptionStyle}>{item.description}</div>}
    </>
  );

  const props = {
    style: itemStyle,
    role: 'menuitem' as const,
    'aria-disabled': item.disabled || undefined,
    onMouseEnter: () => !item.disabled && setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (item.href && !item.disabled) {
    return (
      <a {...props} href={item.href}>
        {content}
      </a>
    );
  }

  return <div {...props}>{content}</div>;
}

function NavigationMenuTrigger({
  item,
}: {
  item: NavMenuItem;
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasChildren = item.children && item.children.length > 0;

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearTimer();
    setHovered(true);
    if (hasChildren) {
      timeoutRef.current = setTimeout(() => {
        setOpen(true);
      }, 150);
    }
  }, [hasChildren, clearTimer]);

  const handleMouseLeave = useCallback(() => {
    clearTimer();
    setHovered(false);
    if (hasChildren) {
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 150);
    }
  }, [hasChildren, clearTimer]);

  const isActive = open || hovered;

  const triggerStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: theme.space[2],
    padding: `${theme.space[4]}px ${theme.space[6]}px`,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    color: theme.semantic.text.primary,
    background: isActive && !item.disabled ? theme.semantic.surface.hover : 'transparent',
    borderRadius: theme.radius.md,
    border: 'none',
    cursor: item.disabled ? 'default' : 'pointer',
    opacity: item.disabled ? 0.5 : 1,
    pointerEvents: item.disabled ? 'none' : undefined,
    textDecoration: 'none',
    boxSizing: 'border-box',
    transition: transition('background-color'),
    borderBottom: open ? `2px solid ${theme.semantic.fill.primary}` : '2px solid transparent',
  };

  const chevronStyle: CSSProperties = {
    color: theme.semantic.text.muted,
    fontSize: theme.fontSize[12],
    lineHeight: 1,
  };

  const wrapperStyle: CSSProperties = {
    position: 'relative',
  };

  const triggerContent = (
    <>
      {item.label}
      {hasChildren && <span style={chevronStyle} aria-hidden="true">{'▾'}</span>}
    </>
  );

  const triggerElement = item.href && !item.disabled && !hasChildren ? (
    <a
      style={triggerStyle}
      href={item.href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {triggerContent}
    </a>
  ) : (
    <button
      type="button"
      style={triggerStyle}
      aria-expanded={hasChildren ? open : undefined}
      aria-haspopup={hasChildren ? 'menu' : undefined}
      disabled={item.disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {triggerContent}
    </button>
  );

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {triggerElement}
      {open && hasChildren && item.children && (
        <NavigationMenuDropdown items={item.children} />
      )}
    </div>
  );
}

export function NavigationMenu({ items, style, ref }: NavigationMenuProps) {
  const theme = useTheme();

  const rootStyle: CSSProperties = mergeStyles(
    {
      display: 'flex',
      alignItems: 'center',
      gap: theme.space[2],
      fontFamily: theme.fontFamily.sans,
    },
    style,
  );

  return (
    <nav ref={ref} style={rootStyle} role="navigation" aria-label="Main">
      {items.map((item, index) => (
        <NavigationMenuTrigger key={index} item={item} />
      ))}
    </nav>
  );
}
