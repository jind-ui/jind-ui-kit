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
  const merged = deepMerge(
    defaultTheme as unknown as Record<string, unknown>,
    overrides as unknown as Record<string, unknown>,
  );
  return resolveAliases(merged, merged) as unknown as JindTheme;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function resolveRef(root: Record<string, unknown>, ref: string): unknown {
  const path = ref.slice(1).split('.');
  let current: unknown = root;
  for (const segment of path) {
    if (current && typeof current === 'object' && !Array.isArray(current)) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return ref;
    }
  }
  if (typeof current === 'string' && current.startsWith('$')) {
    return resolveRef(root, current);
  }
  return current;
}

function resolveAliases(
  obj: Record<string, unknown>,
  root: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === 'string' && val.startsWith('$')) {
      result[key] = resolveRef(root, val);
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      result[key] = resolveAliases(val as Record<string, unknown>, root);
    } else {
      result[key] = val;
    }
  }
  return result;
}

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
