import { colors, semanticColors } from '../tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, typeVariants } from '../tokens/typography';
import { space, controlHeight, controlPadding, iconSize, stackGap, fieldLabelGap } from '../tokens/spacing';
import { radius, borderWidth, shadow, focusRing, duration, easing } from '../tokens/elevation';

export interface JindTheme {
  colors: typeof colors;
  semantic: typeof semanticColors;
  fontFamily: typeof fontFamily;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  lineHeight: typeof lineHeight;
  letterSpacing: typeof letterSpacing;
  typeVariants: typeof typeVariants;
  space: typeof space;
  controlHeight: typeof controlHeight;
  controlPadding: typeof controlPadding;
  iconSize: typeof iconSize;
  stackGap: number;
  fieldLabelGap: number;
  radius: typeof radius;
  borderWidth: typeof borderWidth;
  shadow: typeof shadow;
  focusRing: typeof focusRing;
  duration: typeof duration;
  easing: typeof easing;
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export const defaultTheme: JindTheme = {
  colors,
  semantic: semanticColors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  typeVariants,
  space,
  controlHeight,
  controlPadding,
  iconSize,
  stackGap,
  fieldLabelGap,
  radius,
  borderWidth,
  shadow,
  focusRing,
  duration,
  easing,
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  },
};

export function createTheme(overrides: DeepPartial<JindTheme>): JindTheme {
  return deepMerge(
    defaultTheme as unknown as Record<string, unknown>,
    overrides as unknown as Record<string, unknown>,
  ) as unknown as JindTheme;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...target };
  for (const key in source) {
    const sourceVal = source[key];
    const targetVal = target[key];
    if (
      sourceVal &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      targetVal &&
      typeof targetVal === 'object' &&
      !Array.isArray(targetVal)
    ) {
      result[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      );
    } else if (sourceVal !== undefined) {
      result[key] = sourceVal;
    }
  }
  return result;
}
