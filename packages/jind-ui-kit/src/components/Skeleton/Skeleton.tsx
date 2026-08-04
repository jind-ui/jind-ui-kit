import { useEffect, type CSSProperties, type Ref } from 'react';
import type { Radius, RadiusValue } from '../../types';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';
import { useTheme } from '../../theme/ThemeProvider';

export interface SkeletonProps extends PerCornerRadiusProps {
  width?: number | string;
  height?: number | string;
  radius?: RadiusValue;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

const ANIMATION_NAME = 'jind-skeleton-pulse';
let styleInjected = false;

function injectKeyframes() {
  if (styleInjected) return;
  if (typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.setAttribute('data-jind-skeleton', '');
  style.textContent = `@keyframes ${ANIMATION_NAME} { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`;
  document.head.appendChild(style);
  styleInjected = true;
}

export function Skeleton(
  { width, height, radius = 'sm', style, ref, radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft, ...rest }: SkeletonProps,
) {
  const theme = useTheme();

  useEffect(() => {
    injectKeyframes();
  }, []);

  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const skeletonStyle: CSSProperties = {
    display: 'block',
    backgroundColor: theme.colors.gray[150],
    ...radiusStyle,
    width,
    height,
    animation: `${ANIMATION_NAME} 1.5s ease-in-out infinite`,
    ...style,
  };

  return <div ref={ref} style={skeletonStyle} data-testid="skeleton" aria-hidden="true" {...rest} />;
}
