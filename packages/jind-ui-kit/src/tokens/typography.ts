export const fontFamily: Record<string, string> = {
  sans: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
};

export const fontSize: Record<number, number> = {
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  16: 16,
  18: 18,
  22: 22,
  28: 28,
};

export const fontWeight: Record<string, number> = {
  regular: 400,
  medium: 500,
  bold: 700,
};

export const lineHeight: Record<string, number> = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
};

export const letterSpacing: Record<string, number> = {
  tight: -0.01,
  normal: 0,
};

export const typeVariants: Record<string, { fontFamily: string; fontSize: number; fontWeight: number; lineHeight: number }> = {
  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize[14],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
  control: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize[14],
    fontWeight: fontWeight.medium,
    lineHeight: 1,
  },
  label: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize[14],
    fontWeight: fontWeight.regular,
    lineHeight: 1.4,
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize[13],
    fontWeight: fontWeight.medium,
    lineHeight: 1.3,
  },
  'card-title': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize[16],
    fontWeight: fontWeight.bold,
    lineHeight: 1.3,
  },
  heading: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize[18],
    fontWeight: fontWeight.medium,
    lineHeight: 1.3,
  },
};

export type TypeVariant = keyof typeof typeVariants;
