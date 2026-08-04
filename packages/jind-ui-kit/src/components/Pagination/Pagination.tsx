import { type CSSProperties, type Ref } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles } from '../../utils/styles';

export interface PaginationProps {
  ref?: Ref<HTMLElement>;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showEdges?: boolean;
  style?: CSSProperties;
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
    // Always include first page
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

    // Always include last page
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

export function Pagination({
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

  const navStyle: CSSProperties = mergeStyles(
    {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    style,
  );

  const baseButtonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    minWidth: 32,
    padding: '0 6px',
    borderRadius: theme.radius.md,
    border: 'none',
    background: 'none',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    lineHeight: 1,
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    color: theme.semantic.text.primary,
    transition: transition('background-color', 'color'),
  };

  const arrowButtonStyle = (disabled: boolean): CSSProperties => ({
    ...baseButtonStyle,
    color: disabled ? theme.semantic.text.muted : theme.semantic.text.primary,
    cursor: disabled ? 'default' : 'pointer',
    pointerEvents: disabled ? 'none' : undefined,
    opacity: disabled ? 0.5 : 1,
  });

  const pageButtonStyle = (active: boolean): CSSProperties => ({
    ...baseButtonStyle,
    backgroundColor: active ? theme.semantic.fill.primary : 'transparent',
    color: active ? '#fff' : theme.semantic.text.primary,
    cursor: active ? 'default' : 'pointer',
  });

  const ellipsisStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    minWidth: 32,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    color: theme.semantic.text.muted,
    userSelect: 'none',
    letterSpacing: 2,
  };

  return (
    <nav ref={ref} aria-label="Pagination" style={navStyle}>
      <button
        type="button"
        style={arrowButtonStyle(isFirstPage)}
        disabled={isFirstPage}
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
      >
        {'←'}
      </button>

      {pages.map((item, index) => {
        if (item === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              style={ellipsisStyle}
              aria-hidden="true"
            >
              {'…'}
            </span>
          );
        }

        const isActive = item === page;
        return (
          <button
            key={item}
            type="button"
            style={pageButtonStyle(isActive)}
            aria-label={`Page ${item}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        style={arrowButtonStyle(isLastPage)}
        disabled={isLastPage}
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
      >
        {'→'}
      </button>
    </nav>
  );
}
