import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type Ref,
} from 'react';
import {
  LayoutAnimation,
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

// ─── Accordion Context ──────────────────────────────────────────────
interface AccordionContextValue {
  expandedItems: string[];
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(
      'Accordion sub-components must be used within an <Accordion> provider',
    );
  }
  return ctx;
}

// ─── Item Context ───────────────────────────────────────────────────
interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

function useAccordionItemContext(): AccordionItemContextValue {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(
      'AccordionTrigger / AccordionContent must be used within an <AccordionItem>',
    );
  }
  return ctx;
}

// ─── Accordion ──────────────────────────────────────────────────────
export interface AccordionProps {
  ref?: Ref<View>;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  multiple?: boolean;
  style?: ViewStyle;
  children: ReactNode;
}

export function Accordion({
  ref,
  value,
  defaultValue,
  onChange,
  multiple,
  style,
  children,
}: AccordionProps) {
    const theme = useTheme();

    const [expandedItems, setExpandedItems] = useControllableState<string[]>(
      value,
      defaultValue ?? [],
      onChange,
    );

    const toggle = (item: string) => {
      setExpandedItems((prev) => {
        if (prev.includes(item)) {
          return prev.filter((v) => v !== item);
        }
        return multiple ? [...prev, item] : [item];
      });
    };

    const containerStyle: ViewStyle = {
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.semantic.border!.subtle,
      overflow: 'hidden',
      ...style,
    };

    return (
      <AccordionContext.Provider value={{ expandedItems, toggle }}>
        <View ref={ref} style={containerStyle}>
          {children}
        </View>
      </AccordionContext.Provider>
    );
}

// ─── AccordionItem ──────────────────────────────────────────────────
export interface AccordionItemProps {
  ref?: Ref<View>;
  value: string;
  style?: ViewStyle;
  children: ReactNode;
}

export function AccordionItem({ ref, value, style, children }: AccordionItemProps) {
    const theme = useTheme();
    const { expandedItems } = useAccordionContext();

    const isOpen = expandedItems.includes(value);

    const itemStyle: ViewStyle = {
      borderBottomWidth: 1,
      borderBottomColor: theme.semantic.border!.subtle,
      ...style,
    };

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <View ref={ref} style={itemStyle}>
          {children}
        </View>
      </AccordionItemContext.Provider>
    );
}

// ─── AccordionTrigger ───────────────────────────────────────────────
export interface AccordionTriggerProps {
  style?: ViewStyle;
  children: ReactNode;
}

export function AccordionTrigger({ style, children }: AccordionTriggerProps) {
  const theme = useTheme();
  const { toggle } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();

  const triggerStyle = (pressed: boolean): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: theme.space[6],
    paddingHorizontal: theme.controlPadding.field,
    backgroundColor: pressed
      ? theme.semantic.surface!.hover
      : theme.semantic.surface!.card,
    ...style,
  });

  const textStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: 14,
    fontWeight: theme.fontWeight.medium,
    lineHeight: 21,
    color: theme.semantic.text!.primary,
    flex: 1,
  };

  const chevronStyle: TextStyle = {
    fontSize: 18,
    color: theme.semantic.icon!.default,
    marginLeft: theme.space[4],
  };

  return (
    <Pressable
      onPress={() => toggle(value)}
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen }}
    >
      {({ pressed }: { pressed: boolean }) => (
        <View style={triggerStyle(pressed)}>
          <Text style={textStyle}>{children}</Text>
          <Text style={chevronStyle}>{isOpen ? '▲' : '▼'}</Text>
        </View>
      )}
    </Pressable>
  );
}

// ─── AccordionContent ───────────────────────────────────────────────
export interface AccordionContentProps {
  ref?: Ref<View>;
  style?: ViewStyle;
  children: ReactNode;
}

export function AccordionContent({ ref, style, children }: AccordionContentProps) {
    const theme = useTheme();
    const { isOpen } = useAccordionItemContext();
    const prevOpen = useRef(isOpen);

    useEffect(() => {
      if (prevOpen.current !== isOpen) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        prevOpen.current = isOpen;
      }
    }, [isOpen]);

    if (!isOpen) {
      return null;
    }

    const contentStyle: ViewStyle = {
      paddingTop: theme.space[4],
      paddingHorizontal: theme.controlPadding.field,
      paddingBottom: theme.space[7],
      ...style,
    };

    return (
      <View ref={ref} style={contentStyle}>
        {children}
      </View>
    );
}
