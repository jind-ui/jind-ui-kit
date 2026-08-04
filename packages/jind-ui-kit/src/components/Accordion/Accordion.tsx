import {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  type CSSProperties,
  type ReactNode,
} from 'react';
import type { RadiusValue, AccordionChangeDetails, AccordionChangeReason } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

interface AccordionContextValue {
  expandedItems: string[];
  toggle: (value: string, reason: AccordionChangeReason) => void;
  multiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue>({
  expandedItems: [],
  toggle: () => {},
  multiple: false,
});

export interface AccordionProps extends PerCornerRadiusProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[], details?: AccordionChangeDetails) => void;
  multiple?: boolean;
  radius?: RadiusValue;
  style?: CSSProperties;
  children: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export function Accordion(
  { value, defaultValue = [], onChange, multiple = false, radius = 'md', radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft, style, children, ref, ...rest }: AccordionProps,
) {
  const theme = useTheme();
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });
  const [expandedItems, setExpandedItems] = useControllableState(value, defaultValue);

  const toggle = useCallback(
    (itemValue: string, reason: AccordionChangeReason) => {
      const isOpen = expandedItems.includes(itemValue);
      const next = isOpen
        ? expandedItems.filter((v) => v !== itemValue)
        : multiple ? [...expandedItems, itemValue] : [itemValue];
      setExpandedItems(next);
      onChange?.(next, { reason });
    },
    [multiple, expandedItems, setExpandedItems, onChange],
  );

  return (
    <AccordionContext.Provider value={{ expandedItems, toggle, multiple }}>
      <div
        ref={ref}
        style={{
          ...radiusStyle,
          border: `1px solid ${theme.semantic.border.subtle}`,
          overflow: 'hidden',
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  style?: CSSProperties;
  children: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue>({
  value: '',
  isOpen: false,
  triggerId: '',
  contentId: '',
});

export function AccordionItem(
  { value, style, children, ref, ...rest }: AccordionItemProps,
) {
  const theme = useTheme();
  const { expandedItems } = useContext(AccordionContext);
  const isOpen = expandedItems.includes(value);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, triggerId, contentId }}>
      <div
        ref={ref}
        style={{
          borderBottom: `1px solid ${theme.semantic.border.subtle}`,
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps {
  style?: CSSProperties;
  children: ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

export function AccordionTrigger(
  { style, children, ref, ...rest }: AccordionTriggerProps,
) {
  const theme = useTheme();
  const { toggle } = useContext(AccordionContext);
  const { value, isOpen, triggerId, contentId } = useContext(AccordionItemContext);
  const [hover, setHover] = useState(false);

  return (
    <h3 style={{ margin: 0 }}>
      <button
        ref={ref}
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => toggle(value, 'click')}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: `${theme.space[6]}px ${theme.controlPadding.field}px`,
          border: 'none',
          background: hover ? theme.semantic.surface.hover : theme.semantic.surface.card,
          cursor: 'pointer',
          fontFamily: theme.fontFamily.sans,
          fontSize: theme.fontSize[14],
          fontWeight: theme.fontWeight.medium,
          color: theme.semantic.text.primary,
          transition: `background-color ${theme.duration.fast}ms ${theme.easing.standard}`,
          ...style,
        }}
        {...rest}
      >
        <span>{children}</span>
        <i
          className={isOpen ? 'iconoir-nav-arrow-up' : 'iconoir-nav-arrow-down'}
          aria-hidden="true"
          style={{
            fontSize: 18,
            color: theme.semantic.icon.default,
            transition: `transform ${theme.duration.base}ms ${theme.easing.standard}`,
          }}
        />
      </button>
    </h3>
  );
}

export interface AccordionContentProps {
  style?: CSSProperties;
  children: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export function AccordionContent(
  { style, children, ref, ...rest }: AccordionContentProps,
) {
  const theme = useTheme();
  const { isOpen, contentId, triggerId } = useContext(AccordionItemContext);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      style={{
        padding: `${theme.space[4]}px ${theme.controlPadding.field}px ${theme.space[5]}px`,
        fontFamily: theme.fontFamily.sans,
        fontSize: theme.fontSize[14],
        lineHeight: theme.lineHeight.normal,
        color: theme.semantic.text.secondary,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
