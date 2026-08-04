import { type CSSProperties, type ReactNode } from 'react';

export interface AspectRatioProps {
  ratio?: number;
  width?: number | string;
  style?: CSSProperties;
  children?: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export function AspectRatio(
  { ratio = 16 / 9, width, style, children, ref, ...rest }: AspectRatioProps,
) {
  const outerStyle: CSSProperties = {
    position: 'relative',
    width: width ?? '100%',
    ...style,
  };

  const innerStyle: CSSProperties = {
    paddingBottom: `${(1 / ratio) * 100}%`,
  };

  const contentStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <div ref={ref} style={outerStyle} {...rest}>
      <div style={innerStyle} />
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
