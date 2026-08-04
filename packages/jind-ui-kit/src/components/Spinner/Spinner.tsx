import type { CSSProperties, Ref } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  ref?: Ref<HTMLDivElement>;
  size?: SpinnerSize;
  label?: string;
  tone?: 'primary' | 'neutral';
  style?: CSSProperties;
}

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 40,
};

export function Spinner({
  ref,
  size = 'md',
  label,
  tone = 'primary',
  style,
}: SpinnerProps) {
  const theme = useTheme();
  const px = sizeMap[size];
  const strokeWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4;
  const radius = (px - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const trackColor = theme.colors.gray[200];
  const arcColor =
    tone === 'primary'
      ? theme.semantic.fill.primary
      : theme.colors.gray[400];

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    ...style,
  };

  const svgStyle: CSSProperties = {
    animation: 'jind-spin 0.8s linear infinite',
    width: px,
    height: px,
  };

  return (
    <div
      ref={ref}
      role="status"
      aria-label={label ?? 'Loading'}
      style={containerStyle}
    >
      <style>{`@keyframes jind-spin { to { transform: rotate(360deg) } }`}</style>
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        fill="none"
        style={svgStyle}
        aria-hidden="true"
      >
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          stroke={arcColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
          strokeLinecap="round"
        />
      </svg>
      {label != null && (
        <span
          style={{
            fontSize: theme.fontSize[13],
            fontFamily: theme.fontFamily.sans,
            fontWeight: theme.fontWeight.regular,
            color: theme.semantic.text.muted,
            lineHeight: 1.4,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
