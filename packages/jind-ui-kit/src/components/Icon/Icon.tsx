import { type CSSProperties } from 'react';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export function Icon({
  name,
  size = 18,
  color = 'currentColor',
  strokeWidth,
  style,
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: IconProps) {
  const iconStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size,
    color,
    lineHeight: 1,
    width: size,
    height: size,
    ...style,
  };

  const hidden = ariaHidden ?? !ariaLabel;

  return (
    <i
      data-testid="icon"
      className={'iconoir-' + name + (className ? ' ' + className : '')}
      style={iconStyle}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={hidden || undefined}
    />
  );
}
