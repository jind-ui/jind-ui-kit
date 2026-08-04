import React, { useState, type Ref, type ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle, type LayoutChangeEvent } from 'react-native';
import type { Space, SpacingProps } from '../../types';
import { resolveSpace, spacingToStyle } from '../../utils/styles';

export interface GridProps extends SpacingProps, Omit<ViewProps, 'style'> {
  ref?: Ref<View>;
  columns?: number;
  rowGap?: Space;
  columnGap?: Space;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  style?: ViewStyle;
  children?: ReactNode;
}

export function Grid({
  ref,
  columns = 2,
  rowGap,
  columnGap,
  align,
  justify,
  width,
  height,
  style,
  children,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  gap,
  onLayout: onLayoutProp,
  ...rest
}: GridProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  const resolvedRowGap = resolveSpace(rowGap ?? gap);
  const resolvedColumnGap = resolveSpace(columnGap ?? gap);
  const spacingStyle = spacingToStyle({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml });

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
    onLayoutProp?.(event);
  };

  const gridStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: align,
    justifyContent: justify,
    rowGap: resolvedRowGap,
    columnGap: resolvedColumnGap,
    width,
    height,
    ...spacingStyle,
    ...style,
  };

  const itemWidth =
    containerWidth > 0 && columns > 0
      ? (containerWidth - (columns - 1) * (resolvedColumnGap ?? 0)) / columns
      : undefined;

  return (
    <View ref={ref} style={gridStyle} onLayout={handleLayout} {...rest}>
      {containerWidth > 0 && itemWidth !== undefined
        ? React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            return (
              <View style={{ width: itemWidth }}>
                {child}
              </View>
            );
          })
        : children}
    </View>
  );
}
