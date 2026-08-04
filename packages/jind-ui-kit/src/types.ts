import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';

export type Space = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Radius = 'xs' | 'sm' | 'md' | 'lg' | 'full' | 'none';

export interface PerCornerRadius {
  topLeft?: Radius;
  topRight?: Radius;
  bottomRight?: Radius;
  bottomLeft?: Radius;
}

export type RadiusValue = Radius | PerCornerRadius;

export type Shadow = 'xs' | 'sm' | 'card' | 'menu' | 'none';

export type ControlSize = 'xs' | 'sm' | 'md' | 'lg';

export type Tone =
  | 'neutral'
  | 'primary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'accent'
  | 'brand';

export type TextVariant =
  | 'body'
  | 'control'
  | 'label'
  | 'caption'
  | 'card-title'
  | 'heading';

export type HeadingLevel = 1 | 2 | 3 | 4;

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export type PolymorphicRef<E extends ElementType> =
  ComponentPropsWithoutRef<E>['ref'];

export type PolymorphicProps<
  E extends ElementType,
  P = object,
> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P | 'as'> & {
    as?: E;
    children?: ReactNode;
  };

/* ─── Event detail types ─── */

export type SelectChangeReason = 'click' | 'keyboard' | 'clear' | 'blur';
export interface SelectChangeDetails {
  reason: SelectChangeReason;
  originalEvent?: React.SyntheticEvent;
}

export type ComboboxInputReason = 'input' | 'select' | 'clear' | 'reset';
export interface ComboboxInputDetails {
  reason: ComboboxInputReason;
  originalEvent?: React.SyntheticEvent;
}

export type TabsChangeReason = 'click' | 'keyboard';
export interface TabsChangeDetails {
  reason: TabsChangeReason;
}

export type AccordionChangeReason = 'click' | 'keyboard';
export interface AccordionChangeDetails {
  reason: AccordionChangeReason;
}

export type DismissReason = 'escape' | 'backdrop' | 'close-button' | 'programmatic';
export interface DismissDetails {
  reason: DismissReason;
}

export type ToastDismissReason = 'timeout' | 'swipe' | 'close-button';
export interface ToastDismissDetails {
  reason: ToastDismissReason;
}

export type CheckboxChangeReason = 'click' | 'keyboard';
export interface CheckboxChangeDetails {
  reason: CheckboxChangeReason;
}

export type SwitchChangeReason = 'click' | 'keyboard';
export interface SwitchChangeDetails {
  reason: SwitchChangeReason;
}

export type SliderChangeReason = 'drag' | 'keyboard' | 'click';
export interface SliderChangeDetails {
  reason: SliderChangeReason;
}

export type RadioChangeReason = 'click' | 'keyboard';
export interface RadioChangeDetails {
  reason: RadioChangeReason;
}

export interface SpacingProps {
  p?: Space;
  px?: Space;
  py?: Space;
  pt?: Space;
  pr?: Space;
  pb?: Space;
  pl?: Space;
  m?: Space;
  mx?: Space;
  my?: Space;
  mt?: Space;
  mr?: Space;
  mb?: Space;
  ml?: Space;
  gap?: Space;
}
