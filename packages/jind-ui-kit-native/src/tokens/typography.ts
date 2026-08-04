import { Platform } from 'react-native';

const systemSans = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
}) as string;

const systemMono = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
}) as string;

export const fontFamily = {
  sans: systemSans,
  mono: systemMono,
} as const;

export const fontSize = {
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  18: 18,
  22: 22,
  28: 28,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  bold: '700',
} as const;

export const lineHeight = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
} as const;

export const letterSpacing = {
  tight: -0.2,
  normal: 0,
} as const;

export interface TypeVariantStyle {
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: string;
  readonly lineHeight: number;
}

export const typeVariants = {
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
} as const satisfies Record<string, TypeVariantStyle>;

export type TypeVariant = keyof typeof typeVariants;
