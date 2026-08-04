import type { CSSProperties } from 'react';
import type { Space, Radius, RadiusValue, Shadow } from '../types';
import { space as spaceTokens } from '../tokens/spacing';
import { radius as radiusTokens } from '../tokens/elevation';
import { shadow as shadowTokens } from '../tokens/elevation';
import type { SpacingProps } from '../types';

export function resolveSpace(value: Space | undefined): number | undefined {
  if (value === undefined) return undefined;
  return spaceTokens[value];
}

export function resolveRadius(value: Radius | undefined): number | undefined {
  if (value === undefined) return undefined;
  return radiusTokens[value];
}

export interface PerCornerRadiusProps {
  radiusTopLeft?: Radius;
  radiusTopRight?: Radius;
  radiusBottomRight?: Radius;
  radiusBottomLeft?: Radius;
}

export function resolveRadiusStyle(
  value: RadiusValue | undefined,
  corners?: PerCornerRadiusProps,
): CSSProperties {
  if (value === undefined && !corners) return {};

  if (typeof value === 'object' && value !== null && value !== undefined) {
    return {
      borderTopLeftRadius: value.topLeft ? radiusTokens[value.topLeft] : undefined,
      borderTopRightRadius: value.topRight ? radiusTokens[value.topRight] : undefined,
      borderBottomRightRadius: value.bottomRight ? radiusTokens[value.bottomRight] : undefined,
      borderBottomLeftRadius: value.bottomLeft ? radiusTokens[value.bottomLeft] : undefined,
    };
  }

  const base = value ? radiusTokens[value] : undefined;
  const hasCorners = corners?.radiusTopLeft || corners?.radiusTopRight || corners?.radiusBottomRight || corners?.radiusBottomLeft;

  if (!hasCorners) {
    return base !== undefined ? { borderRadius: base } : {};
  }

  return {
    borderTopLeftRadius: corners?.radiusTopLeft ? radiusTokens[corners.radiusTopLeft] : base,
    borderTopRightRadius: corners?.radiusTopRight ? radiusTokens[corners.radiusTopRight] : base,
    borderBottomRightRadius: corners?.radiusBottomRight ? radiusTokens[corners.radiusBottomRight] : base,
    borderBottomLeftRadius: corners?.radiusBottomLeft ? radiusTokens[corners.radiusBottomLeft] : base,
  };
}

export function resolveShadow(value: Shadow | undefined): string | undefined {
  if (value === undefined) return undefined;
  return shadowTokens[value];
}

export function spacingToStyle(props: SpacingProps): CSSProperties {
  const style: CSSProperties = {};

  if (props.p !== undefined) style.padding = resolveSpace(props.p);
  if (props.px !== undefined) {
    style.paddingLeft = resolveSpace(props.px);
    style.paddingRight = resolveSpace(props.px);
  }
  if (props.py !== undefined) {
    style.paddingTop = resolveSpace(props.py);
    style.paddingBottom = resolveSpace(props.py);
  }
  if (props.pt !== undefined) style.paddingTop = resolveSpace(props.pt);
  if (props.pr !== undefined) style.paddingRight = resolveSpace(props.pr);
  if (props.pb !== undefined) style.paddingBottom = resolveSpace(props.pb);
  if (props.pl !== undefined) style.paddingLeft = resolveSpace(props.pl);

  if (props.m !== undefined) style.margin = resolveSpace(props.m);
  if (props.mx !== undefined) {
    style.marginLeft = resolveSpace(props.mx);
    style.marginRight = resolveSpace(props.mx);
  }
  if (props.my !== undefined) {
    style.marginTop = resolveSpace(props.my);
    style.marginBottom = resolveSpace(props.my);
  }
  if (props.mt !== undefined) style.marginTop = resolveSpace(props.mt);
  if (props.mr !== undefined) style.marginRight = resolveSpace(props.mr);
  if (props.mb !== undefined) style.marginBottom = resolveSpace(props.mb);
  if (props.ml !== undefined) style.marginLeft = resolveSpace(props.ml);

  if (props.gap !== undefined) style.gap = resolveSpace(props.gap);

  return style;
}

export function mergeStyles(
  ...styles: (CSSProperties | undefined)[]
): CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean));
}

export function transition(...properties: string[]): string {
  return properties
    .map((p) => `${p} 120ms cubic-bezier(0.4, 0, 0.2, 1)`)
    .join(', ');
}
