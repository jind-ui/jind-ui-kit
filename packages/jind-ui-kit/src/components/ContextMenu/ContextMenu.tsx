import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Portal } from '../../primitives/Portal/Portal';
import { transition, mergeStyles } from '../../utils/styles';

export interface ContextMenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  onSelect?: () => void;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  children: ReactNode;
  disabled?: boolean;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

function ContextMenuItemRow({
  item,
  onClose,
}: {
  item: ContextMenuItem;
  onClose: () => void;
}) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  const itemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.space[4],
    padding: `${theme.space[3]}px ${theme.space[6]}px`,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    color: item.danger ? theme.semantic.text.danger : theme.semantic.text.primary,
    background: hovered && !item.disabled ? theme.semantic.surface.hover : 'transparent',
    borderRadius: theme.radius.sm,
    cursor: item.disabled ? 'default' : 'pointer',
    opacity: item.disabled ? 0.5 : 1,
    pointerEvents: item.disabled ? 'none' : undefined,
    transition: transition('background-color'),
    boxSizing: 'border-box',
    border: 'none',
    width: '100%',
    textAlign: 'left',
  };

  const shortcutStyle: CSSProperties = {
    marginLeft: 'auto',
    color: theme.semantic.text.muted,
    fontSize: theme.fontSize[12],
    fontFamily: theme.fontFamily.mono,
    flexShrink: 0,
  };

  function handleClick() {
    if (!item.disabled) {
      item.onSelect?.();
      onClose();
    }
  }

  return (
    <div
      style={itemStyle}
      role="menuitem"
      aria-disabled={item.disabled || undefined}
      onMouseEnter={() => !item.disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {item.icon && (
        <i
          className={`iconoir-${item.icon}`}
          style={{ fontSize: 16, flexShrink: 0 }}
          aria-hidden="true"
        />
      )}
      <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
      {item.shortcut && <span style={shortcutStyle}>{item.shortcut}</span>}
    </div>
  );
}

export function ContextMenu({
  items,
  children,
  disabled = false,
  style,
  ref,
}: ContextMenuProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setOpen(false), open);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  function handleContextMenu(e: React.MouseEvent) {
    if (disabled) return;
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
  }

  const menuStyle: CSSProperties = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    zIndex: 1100,
    background: theme.semantic.surface.card,
    border: `1px solid ${theme.semantic.border.default}`,
    boxShadow: theme.shadow.menu,
    borderRadius: theme.radius.md,
    paddingTop: theme.space[2],
    paddingBottom: theme.space[2],
    minWidth: 180,
    boxSizing: 'border-box',
  };

  const separatorStyle: CSSProperties = {
    height: 0,
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    marginTop: theme.space[2],
    marginBottom: theme.space[2],
  };

  return (
    <div ref={ref} style={mergeStyles({ display: 'contents' }, style)} onContextMenu={handleContextMenu}>
      {children}
      {open && (
        <Portal>
          <div ref={menuRef} style={menuStyle} role="menu">
            {items.map((item, index) => {
              if (item.separator) {
                return <div key={index} style={separatorStyle} aria-hidden="true" />;
              }
              return (
                <ContextMenuItemRow key={index} item={item} onClose={handleClose} />
              );
            })}
          </div>
        </Portal>
      )}
    </div>
  );
}
