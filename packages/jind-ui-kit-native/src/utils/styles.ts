import type { ViewStyle } from 'react-native';
import type { Space, Radius, Shadow, SpacingProps } from '../types';
import { space as spaceTokens } from '../tokens/spacing';
import { radius as radiusTokens, shadow as shadowTokens } from '../tokens/elevation';
import type { NativeShadow } from '../tokens/elevation';

export function resolveSpace(value: Space | undefined): number | undefined {
  if (value === undefined) return undefined;
  return spaceTokens[value];
}

export function resolveRadius(value: Radius | undefined): number | undefined {
  if (value === undefined) return undefined;
  return radiusTokens[value];
}

export function resolveShadow(value: Shadow | undefined): NativeShadow | undefined {
  if (value === undefined) return undefined;
  return shadowTokens[value];
}

export function spacingToStyle(props: SpacingProps): ViewStyle {
  const style: ViewStyle = {};

  if (props.p !== undefined) style.padding = resolveSpace(props.p);
  if (props.px !== undefined) {
    style.paddingHorizontal = resolveSpace(props.px);
  }
  if (props.py !== undefined) {
    style.paddingVertical = resolveSpace(props.py);
  }
  if (props.pt !== undefined) style.paddingTop = resolveSpace(props.pt);
  if (props.pr !== undefined) style.paddingRight = resolveSpace(props.pr);
  if (props.pb !== undefined) style.paddingBottom = resolveSpace(props.pb);
  if (props.pl !== undefined) style.paddingLeft = resolveSpace(props.pl);

  if (props.m !== undefined) style.margin = resolveSpace(props.m);
  if (props.mx !== undefined) {
    style.marginHorizontal = resolveSpace(props.mx);
  }
  if (props.my !== undefined) {
    style.marginVertical = resolveSpace(props.my);
  }
  if (props.mt !== undefined) style.marginTop = resolveSpace(props.mt);
  if (props.mr !== undefined) style.marginRight = resolveSpace(props.mr);
  if (props.mb !== undefined) style.marginBottom = resolveSpace(props.mb);
  if (props.ml !== undefined) style.marginLeft = resolveSpace(props.ml);

  if (props.gap !== undefined) style.gap = resolveSpace(props.gap);

  return style;
}

export function mergeStyles(
  ...styles: (ViewStyle | undefined)[]
): ViewStyle {
  return Object.assign({}, ...styles.filter(Boolean)) as ViewStyle;
}
