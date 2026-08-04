import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type Space = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Radius = 'xs' | 'sm' | 'md' | 'lg' | 'full' | 'none';

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

export type NativeStyle = ViewStyle | TextStyle | ImageStyle;

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
