import {
  useState,
  type CSSProperties,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { mergeStyles } from '../../utils/styles';

export interface CalendarProps {
  year?: number;
  month?: number;
  selected?: Date;
  outlined?: Date;
  onSelect?: (date: Date) => void;
  onClear?: () => void;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

interface DayCell {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
}

function buildCalendarGrid(year: number, month: number): DayCell[] {
  const firstDay = getFirstDayOfWeek(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const cells: DayCell[] = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    cells.push({
      date: new Date(year, month - 1, day),
      dayOfMonth: day,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      date: new Date(year, month, day),
      dayOfMonth: day,
      isCurrentMonth: true,
    });
  }

  // Next month leading days to fill grid
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let day = 1; day <= remaining; day++) {
      cells.push({
        date: new Date(year, month + 1, day),
        dayOfMonth: day,
        isCurrentMonth: false,
      });
    }
  }

  return cells;
}

export function Calendar({
  year: yearProp,
  month: monthProp,
  selected,
  outlined,
  onSelect,
  onClear,
  style,
  ref,
  ...rest
}: CalendarProps) {
  const theme = useTheme();
  const today = new Date();

  const [viewYear, setViewYear] = useState(
    yearProp ?? selected?.getFullYear() ?? today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    monthProp ?? selected?.getMonth() ?? today.getMonth(),
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayYear = yearProp ?? viewYear;
  const displayMonth = monthProp ?? viewMonth;

  const cells = buildCalendarGrid(displayYear, displayMonth);

  function navigateMonth(delta: number) {
    let newMonth = viewMonth + delta;
    let newYear = viewYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setViewMonth(newMonth);
    setViewYear(newYear);
  }

  const containerStyle: CSSProperties = mergeStyles(
    {
      width: 340,
      padding: 20,
      backgroundColor: theme.semantic.surface.card,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadow.card,
      boxSizing: 'border-box' as const,
      fontFamily: theme.fontFamily.sans,
    },
    style,
  );

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  };

  const navButtonStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    fontSize: 18,
    color: theme.semantic.text.primary,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const monthYearStyle: CSSProperties = {
    ...theme.typeVariants.heading,
    color: theme.semantic.text.primary,
    textAlign: 'center' as const,
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 4,
  };

  const dayHeaderStyle: CSSProperties = {
    ...theme.typeVariants.label,
    color: theme.semantic.text.muted,
    textAlign: 'center' as const,
    height: 38,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  function getDayCellStyle(cell: DayCell, index: number): CSSProperties {
    const isSelected = selected != null && isSameDay(cell.date, selected);
    const isOutlined = outlined != null && isSameDay(cell.date, outlined);
    const isToday = isSameDay(cell.date, today);
    const isHovered = hoveredIndex === index && !isSelected;

    const cellStyle: CSSProperties = {
      width: 38,
      height: 38,
      borderRadius: theme.radius.sm,
      fontFamily: theme.fontFamily.sans,
      fontSize: theme.fontSize[14],
      fontWeight: isToday
        ? theme.fontWeight.bold
        : theme.fontWeight.medium,
      color: isSelected
        ? theme.semantic.text.inverse
        : cell.isCurrentMonth
          ? theme.semantic.text.primary
          : theme.semantic.text.muted,
      backgroundColor: isSelected
        ? theme.semantic.fill.primary
        : isHovered
          ? theme.semantic.surface.hover
          : 'transparent',
      border: isOutlined && !isSelected
        ? `2px solid ${theme.semantic.border.focus}`
        : '2px solid transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      lineHeight: 1,
      boxSizing: 'border-box' as const,
    };

    return cellStyle;
  }

  const footerStyle: CSSProperties = {
    borderTop: `1px solid ${theme.semantic.border.subtle}`,
    paddingTop: 8,
    marginTop: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const clearButtonStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: theme.semantic.text.link,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    padding: 0,
  };

  return (
    <div ref={ref} style={containerStyle} {...rest}>
      {/* Header */}
      <div style={headerStyle}>
        <button
          type="button"
          style={navButtonStyle}
          onClick={() => navigateMonth(-1)}
          aria-label="Previous month"
        >
          &#8249;
        </button>
        <span style={monthYearStyle}>
          {MONTH_NAMES[displayMonth]} {displayYear}
        </span>
        <button
          type="button"
          style={navButtonStyle}
          onClick={() => navigateMonth(1)}
          aria-label="Next month"
        >
          &#8250;
        </button>
      </div>

      {/* Grid */}
      <div style={gridStyle} role="grid" aria-label="Calendar">
        {/* Day-of-week headers */}
        {DAY_LABELS.map((label, i) => (
          <div key={`header-${i}`} style={dayHeaderStyle} role="columnheader">
            {label}
          </div>
        ))}

        {/* Day cells */}
        {cells.map((cell, i) => (
          <button
            key={`day-${i}`}
            type="button"
            style={getDayCellStyle(cell, i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSelect?.(cell.date)}
            aria-label={cell.date.toDateString()}
            aria-selected={
              selected != null ? isSameDay(cell.date, selected) : undefined
            }
            aria-current={isSameDay(cell.date, today) ? 'date' : undefined}
          >
            {cell.dayOfMonth}
          </button>
        ))}
      </div>

      {/* Footer */}
      {onClear != null && (
        <div style={footerStyle}>
          <button
            type="button"
            style={clearButtonStyle}
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
