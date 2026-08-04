export const space = {
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
  6: 12,
  7: 16,
  8: 20,
  9: 24,
  10: 32,
  11: 40,
  12: 48,
} as const satisfies Record<number, number>;

export const controlHeight = {
  xs: 26,
  sm: 32,
  md: 40,
  lg: 44,
} as const satisfies Record<string, number>;

export const controlPadding = {
  field: 14,
  button: 22,
  chip: 14,
} as const satisfies Record<string, number>;

export const iconSize = {
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
} as const satisfies Record<number, number>;

export const stackGap = 12;
export const fieldLabelGap = 8;
