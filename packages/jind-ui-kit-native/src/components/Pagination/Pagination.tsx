import React, { memo } from 'react';
import { Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface PaginationProps {
  ref?: React.Ref<View>;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showEdges?: boolean;
  style?: ViewStyle;
}

type PageItem = number | 'ellipsis';

export function getPageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
  showEdges: boolean,
): PageItem[] {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];

  const range: PageItem[] = [];

  const siblingStart = Math.max(page - siblingCount, 1);
  const siblingEnd = Math.min(page + siblingCount, totalPages);

  if (showEdges) {
    range.push(1);

    if (siblingStart > 2) {
      range.push('ellipsis');
    }

    for (let i = Math.max(siblingStart, 2); i <= Math.min(siblingEnd, totalPages - 1); i++) {
      range.push(i);
    }

    if (siblingEnd < totalPages - 1) {
      range.push('ellipsis');
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }
  } else {
    for (let i = siblingStart; i <= siblingEnd; i++) {
      range.push(i);
    }
  }

  return range;
}

function PaginationInner({
  ref,
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showEdges = true,
  style,
}: PaginationProps) {
  const theme = useTheme();
  const pages = getPageRange(page, totalPages, siblingCount, showEdges);

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    ...style,
  };

  const baseButtonStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    minWidth: 32,
    paddingHorizontal: 6,
    borderRadius: theme.radius.md,
  };

  const baseTextStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.fontSize[14] * 1.3,
  };

  const arrowButtonStyle = (pressed: boolean, disabled: boolean): ViewStyle => ({
    ...baseButtonStyle,
    backgroundColor: pressed && !disabled ? theme.semantic.surface.pressed : 'transparent',
    opacity: disabled ? 0.5 : 1,
  });

  const arrowTextStyle = (disabled: boolean): TextStyle => ({
    ...baseTextStyle,
    color: disabled ? theme.semantic.text.muted : theme.semantic.text.primary,
  });

  const pageButtonStyle = (pressed: boolean, active: boolean): ViewStyle => ({
    ...baseButtonStyle,
    backgroundColor: active
      ? theme.semantic.fill.primary
      : pressed
        ? theme.semantic.surface.pressed
        : 'transparent',
  });

  const pageTextStyle = (active: boolean): TextStyle => ({
    ...baseTextStyle,
    color: active ? '#fff' : theme.semantic.text.primary,
  });

  const ellipsisTextStyle: TextStyle = {
    ...baseTextStyle,
    color: theme.semantic.text.muted,
    letterSpacing: 2,
  };

  return (
    <View ref={ref} style={containerStyle} accessibilityRole="menu">
      <Pressable
        style={({ pressed }) => arrowButtonStyle(pressed, isFirstPage)}
        disabled={isFirstPage}
        onPress={() => onPageChange(page - 1)}
        hitSlop={4}
        accessibilityRole="button"
        accessibilityLabel="Previous page"
        accessibilityState={{ disabled: isFirstPage }}
      >
        <Text style={arrowTextStyle(isFirstPage)}>{'←'}</Text>
      </Pressable>

      {pages.map((item, index) => {
        if (item === 'ellipsis') {
          return (
            <View
              key={`ellipsis-${index}`}
              style={baseButtonStyle}
              accessibilityElementsHidden
            >
              <Text style={ellipsisTextStyle}>{'…'}</Text>
            </View>
          );
        }

        const isActive = item === page;
        return (
          <Pressable
            key={item}
            style={({ pressed }) => pageButtonStyle(pressed, isActive)}
            onPress={() => onPageChange(item)}
            hitSlop={4}
            accessibilityRole="button"
            accessibilityLabel={`Page ${item}`}
            accessibilityState={{ selected: isActive }}
          >
            <Text style={pageTextStyle(isActive)}>{item}</Text>
          </Pressable>
        );
      })}

      <Pressable
        style={({ pressed }) => arrowButtonStyle(pressed, isLastPage)}
        disabled={isLastPage}
        onPress={() => onPageChange(page + 1)}
        hitSlop={4}
        accessibilityRole="button"
        accessibilityLabel="Next page"
        accessibilityState={{ disabled: isLastPage }}
      >
        <Text style={arrowTextStyle(isLastPage)}>{'→'}</Text>
      </Pressable>
    </View>
  );
}

PaginationInner.displayName = 'Pagination';

export const Pagination = memo(PaginationInner);
