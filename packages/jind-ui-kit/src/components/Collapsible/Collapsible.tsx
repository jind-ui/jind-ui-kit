import {
  useRef,
  useEffect,
  useId,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import { transition } from '../../utils/styles';

function ChevronIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.5 6L8 9.5L11.5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface CollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  trigger: ReactNode;
  icon?: ReactNode | false;
  disabled?: boolean;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function Collapsible({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  trigger,
  icon,
  disabled = false,
  style,
  ref,
}: CollapsibleProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useControllableState(controlledOpen, defaultOpen, onOpenChange);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentId = useId();

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      el.style.maxHeight = `${el.scrollHeight}px`;
    } else {
      el.style.maxHeight = '0px';
    }
  }, [isOpen]);

  const showIcon = icon !== false;
  const iconContent = icon === undefined ? <ChevronIcon /> : icon;

  const triggerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.space[3],
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    userSelect: 'none',
  };

  const iconStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: theme.semantic.icon.muted,
    transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
    transition: `transform ${theme.duration.base}ms ${theme.easing.standard}`,
  };

  const contentStyle: CSSProperties = {
    overflow: 'hidden',
    maxHeight: isOpen ? undefined : 0,
    transition: transition('max-height'),
  };

  return (
    <div ref={ref} style={style}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-disabled={disabled}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        style={triggerStyle}
      >
        {showIcon && <span style={iconStyle}>{iconContent}</span>}
        <span style={{ flex: 1 }}>{trigger}</span>
      </div>
      <div
        id={contentId}
        ref={contentRef}
        role="region"
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  );
}
