import {
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
  useContext,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../theme/ThemeProvider';
import { useClickOutside } from '../../hooks';
import { transition } from '../../utils/styles';

type PanelWidth = 'trigger' | 'container' | 'full';

interface MegaMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  panelWidth: PanelWidth;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cancelClose: () => void;
  scheduleClose: () => void;
}

const MegaMenuContext = createContext<MegaMenuContextValue | null>(null);

function useMegaMenu() {
  const ctx = useContext(MegaMenuContext);
  if (!ctx) throw new Error('MegaMenu compound components must be used within MegaMenu');
  return ctx;
}

export interface MegaMenuProps {
  ref?: Ref<HTMLDivElement>;
  children: ReactNode;
  panelWidth?: PanelWidth;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnClickOutside?: boolean;
  closeDelay?: number;
  style?: CSSProperties;
}

export function MegaMenu({
  ref,
  children,
  panelWidth = 'container',
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeDelay = 200,
  style,
}: MegaMenuProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setInternalOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  const handleMouseLeave = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [setOpen, closeDelay, clearCloseTimer]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  useClickOutside(
    containerRef,
    () => {
      if (closeOnClickOutside) setOpen(false);
    },
    open,
  );

  const rootStyle: CSSProperties = {
    position: 'relative',
    ...style,
  };

  return (
    <MegaMenuContext.Provider value={{ open, setOpen, panelWidth, triggerRef, containerRef, cancelClose: clearCloseTimer, scheduleClose: handleMouseLeave }}>
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        style={rootStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </MegaMenuContext.Provider>
  );
}

export interface MegaMenuTriggerProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function MegaMenuTrigger({ children, style }: MegaMenuTriggerProps) {
  const { open, setOpen, triggerRef } = useMegaMenu();
  const theme = useTheme();

  const triggerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '8px 16px',
    border: 'none',
    background: open ? theme.semantic.surface.hover : 'transparent',
    borderRadius: theme.radius.sm,
    cursor: 'pointer',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    color: theme.semantic.text.primary,
    transition: transition('background-color'),
    ...style,
  };

  return (
    <div ref={triggerRef} style={{ display: 'inline-flex' }}>
      <button
        type="button"
        style={triggerStyle}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
      >
        {children}
      </button>
    </div>
  );
}

export interface MegaMenuPanelProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function MegaMenuPanel({ children, style }: MegaMenuPanelProps) {
  const { open, panelWidth, triggerRef, containerRef, cancelClose, scheduleClose } = useMegaMenu();
  const theme = useTheme();
  const panelRef = useRef<HTMLDivElement>(null);
  const [positionStyle, setPositionStyle] = useState<CSSProperties>({});
  const isFull = panelWidth === 'full';

  useEffect(() => {
    if (!open) return;

    const computePosition = () => {
      if (isFull) {
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          setPositionStyle({
            position: 'fixed',
            top: rect.bottom,
            left: 0,
            width: '100vw',
          });
        }
      } else if (panelWidth === 'container') {
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          setPositionStyle({
            position: 'fixed',
            top: rect.bottom + 2,
            left: rect.left,
            width: rect.width,
          });
        }
      } else {
        const trigger = triggerRef.current;
        if (trigger) {
          const rect = trigger.getBoundingClientRect();
          setPositionStyle({
            position: 'fixed',
            top: rect.bottom + 2,
            left: rect.left,
            minWidth: rect.width,
          });
        }
      }
    };

    computePosition();
    window.addEventListener('resize', computePosition);
    window.addEventListener('scroll', computePosition, true);
    return () => {
      window.removeEventListener('resize', computePosition);
      window.removeEventListener('scroll', computePosition, true);
    };
  }, [open, isFull, panelWidth, triggerRef, containerRef]);

  if (!open) return null;

  const baseStyle: CSSProperties = {
    background: theme.semantic.surface.card,
    border: `1px solid ${theme.semantic.border.subtle}`,
    boxShadow: theme.shadow.menu,
    borderRadius: isFull ? 0 : theme.radius.md,
    padding: '24px 32px',
    zIndex: 1000,
    boxSizing: 'border-box',
    ...positionStyle,
    ...style,
  };

  const panel = (
    <div
      ref={panelRef}
      style={baseStyle}
      role="menu"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );

  return createPortal(panel, document.body);
}

export interface MegaMenuGroupProps {
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function MegaMenuGroup({ title, children, style }: MegaMenuGroupProps) {
  const theme = useTheme();

  return (
    <div style={style}>
      {title != null && (
        <div
          style={{
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize[12],
            fontWeight: theme.fontWeight.semibold,
            color: theme.semantic.text.muted,
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export interface MegaMenuItemProps {
  children: ReactNode;
  icon?: ReactNode;
  label?: string;
  description?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}

export function MegaMenuItem({
  children,
  icon,
  label,
  description,
  href,
  onClick,
  disabled,
  style,
}: MegaMenuItemProps) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const { setOpen } = useMegaMenu();

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setOpen(false);
  };

  const itemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '10px 12px',
    borderRadius: theme.radius.sm,
    background: hovered && !disabled ? theme.semantic.surface.hover : 'transparent',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    textDecoration: 'none',
    color: 'inherit',
    transition: transition('background-color'),
    border: 'none',
    width: '100%',
    fontFamily: theme.fontFamily.sans,
    boxSizing: 'border-box',
    ...style,
  };

  const content = children ?? (
    <>
      {icon != null && (
        <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1.2 }}>{icon}</span>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {label != null && (
          <span
            style={{
              fontSize: theme.fontSize[14],
              fontWeight: theme.fontWeight.medium,
              color: theme.semantic.text.primary,
              lineHeight: 1.4,
            }}
          >
            {label}
          </span>
        )}
        {description != null && (
          <span
            style={{
              fontSize: theme.fontSize[13],
              fontWeight: theme.fontWeight.regular,
              color: theme.semantic.text.muted,
              lineHeight: 1.4,
            }}
          >
            {description}
          </span>
        )}
      </div>
    </>
  );

  const eventProps = {
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => setHovered(false),
    role: 'menuitem' as const,
    'aria-disabled': disabled || undefined,
  };

  if (href && !disabled) {
    return (
      <a style={itemStyle} href={href} {...eventProps} onClick={handleClick}>
        {content}
      </a>
    );
  }

  return (
    <div style={itemStyle} {...eventProps} onClick={handleClick}>
      {content}
    </div>
  );
}

MegaMenu.Trigger = MegaMenuTrigger;
MegaMenu.Panel = MegaMenuPanel;
MegaMenu.Group = MegaMenuGroup;
MegaMenu.Item = MegaMenuItem;
