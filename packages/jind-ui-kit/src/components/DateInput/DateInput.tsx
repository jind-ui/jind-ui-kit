import { useState, useRef, useEffect, useId, type CSSProperties } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { useClickOutside } from '../../hooks/useClickOutside';
import { transition } from '../../utils/styles';

export interface DateInputProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  style?: CSSProperties;
}

export interface DateRangeInputProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (start: Date | null, end: Date | null) => void;
  startPlaceholder?: string;
  endPlaceholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  style?: CSSProperties;
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isBetween(date: Date, start: Date, end: Date): boolean {
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t > s && t < e;
}

function formatDate(date: Date): string {
  return `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

interface DayCell {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
}

function buildGrid(year: number, month: number): DayCell[] {
  const first = getFirstDayOfWeek(year, month);
  const days = getDaysInMonth(year, month);
  const prevDays = getDaysInMonth(year, month - 1);
  const cells: DayCell[] = [];

  for (let i = first - 1; i >= 0; i--)
    cells.push({ date: new Date(year, month - 1, prevDays - i), day: prevDays - i, isCurrentMonth: false });
  for (let d = 1; d <= days; d++)
    cells.push({ date: new Date(year, month, d), day: d, isCurrentMonth: true });
  const rem = 7 - (cells.length % 7);
  if (rem < 7)
    for (let d = 1; d <= rem; d++)
      cells.push({ date: new Date(year, month + 1, d), day: d, isCurrentMonth: false });

  return cells;
}

interface InlineCalendarProps {
  selected?: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  hovered?: Date | null;
  onSelect: (date: Date) => void;
  onHover?: (date: Date | null) => void;
  onClear?: () => void;
}

function InlineCalendar({ selected, rangeStart, rangeEnd, hovered, onSelect, onHover, onClear }: InlineCalendarProps) {
  const theme = useTheme();
  const today = new Date();
  const initDate = selected ?? rangeStart ?? today;
  const [viewYear, setViewYear] = useState(initDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initDate.getMonth());

  useEffect(() => {
    const d = selected ?? rangeStart;
    if (d) {
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [selected, rangeStart]);

  const cells = buildGrid(viewYear, viewMonth);

  function nav(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y--; }
    else if (m > 11) { m = 0; y++; }
    setViewMonth(m);
    setViewYear(y);
  }

  const navBtn: CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: 32,
    height: 32,
    borderRadius: theme.radius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: theme.semantic.text.primary,
    transition: `background ${theme.duration.fast}ms`,
  };

  return (
    <div style={{ width: 320, fontFamily: theme.fontFamily.sans }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0 12px' }}>
        <button type="button" style={navBtn} onClick={() => nav(-1)}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = theme.semantic.surface.hover; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >&#8249;</button>
        <span style={{ fontSize: 15, fontWeight: theme.fontWeight.semibold, color: theme.semantic.text.primary }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button type="button" style={navBtn} onClick={() => nav(1)}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = theme.semantic.surface.hover; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >&#8250;</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {DAY_LABELS.map((l, i) => (
          <div key={i} style={{
            height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: theme.fontWeight.medium, color: theme.semantic.text.muted,
          }}>{l}</div>
        ))}

        {cells.map((cell, i) => {
          const isSel = selected && isSameDay(cell.date, selected);
          const isToday = isSameDay(cell.date, today);
          const isRangeStart = rangeStart && isSameDay(cell.date, rangeStart);
          const isRangeEnd = rangeEnd && isSameDay(cell.date, rangeEnd);
          const isHoveredEnd = !rangeEnd && hovered && rangeStart && isSameDay(cell.date, hovered);
          const effectiveEnd = rangeEnd ?? hovered;
          const inRange = rangeStart && effectiveEnd && isBetween(cell.date, rangeStart, effectiveEnd);

          let bg = 'transparent';
          let fg = cell.isCurrentMonth ? theme.semantic.text.primary : theme.semantic.text.muted;
          let radius = theme.radius.sm;
          let fontW = isToday ? theme.fontWeight.bold : theme.fontWeight.medium;

          if (isSel || isRangeStart || isRangeEnd) {
            bg = theme.semantic.fill.primary;
            fg = theme.semantic.text.inverse;
          } else if (isHoveredEnd && cell.isCurrentMonth) {
            bg = theme.semantic.fill.primary;
            fg = theme.semantic.text.inverse;
          } else if (inRange && cell.isCurrentMonth) {
            bg = theme.semantic.surface.selected;
          }

          const endLike = isRangeEnd || isHoveredEnd;
          let borderRadiusVal: string = `${radius}px`;
          if (inRange && !isRangeStart && !endLike) borderRadiusVal = '0';
          if (isRangeStart) borderRadiusVal = `${radius}px 0 0 ${radius}px`;
          if (endLike) borderRadiusVal = `0 ${radius}px ${radius}px 0`;
          if (isRangeStart && endLike) borderRadiusVal = `${radius}px`;

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(cell.date)}
              onMouseEnter={() => onHover?.(cell.date)}
              onMouseLeave={() => onHover?.(null)}
              style={{
                width: 44, height: 36,
                border: isToday && !isSel && !isRangeStart && !isRangeEnd
                  ? `1.5px solid ${theme.semantic.border.focus}` : '1.5px solid transparent',
                borderRadius: borderRadiusVal,
                background: bg,
                color: fg,
                fontWeight: fontW,
                fontSize: 13,
                fontFamily: theme.fontFamily.sans,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                boxSizing: 'border-box',
                transition: `background ${theme.duration.fast}ms`,
              }}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      {onClear && (
        <div style={{ borderTop: `1px solid ${theme.semantic.border.subtle}`, marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClear} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: theme.semantic.text.link, fontSize: 13, fontWeight: theme.fontWeight.medium,
            fontFamily: theme.fontFamily.sans, padding: '4px 8px',
          }}>Clear</button>
        </div>
      )}
    </div>
  );
}

function TriggerShell({
  children,
  open,
  disabled,
  error,
  onClick,
  ariaDescribedby,
  style,
}: {
  children: React.ReactNode;
  open: boolean;
  disabled: boolean;
  error: boolean;
  onClick: () => void;
  ariaDescribedby?: string;
  style?: CSSProperties;
}) {
  const theme = useTheme();
  const shellStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    height: theme.controlHeight.md,
    padding: `0 ${theme.controlPadding.field}px`,
    borderRadius: theme.radius.sm,
    background: open ? theme.semantic.surface.card : theme.semantic.surface.subtle,
    border: error
      ? `2px solid ${theme.colors.red[600]}`
      : open
        ? `2px solid ${theme.semantic.border.focus}`
        : `1px solid ${theme.semantic.border.subtle}`,
    boxShadow: error
      ? theme.focusRing.danger
      : open
        ? theme.focusRing.primary
        : theme.shadow.xs,
    color: disabled ? theme.semantic.text.muted : theme.semantic.text.primary,
    fontFamily: theme.typeVariants.label.fontFamily,
    fontSize: theme.typeVariants.label.fontSize,
    fontWeight: theme.typeVariants.label.fontWeight,
    lineHeight: theme.typeVariants.label.lineHeight,
    transition: transition('background-color', 'border-color', 'box-shadow'),
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxSizing: 'border-box',
    userSelect: 'none',
    ...style,
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-invalid={error || undefined}
      aria-describedby={ariaDescribedby}
      data-testid="date-input"
      onClick={() => { if (!disabled) onClick(); }}
      onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !disabled) { e.preventDefault(); onClick(); } }}
      style={shellStyle}
    >
      <span style={{ fontSize: 15, flexShrink: 0, display: 'flex', alignItems: 'center', color: theme.semantic.icon.muted }}>
        &#x1F4C5;
      </span>
      {children}
    </div>
  );
}

export function DateInput({
  value,
  onChange,
  placeholder = 'Pick a date',
  disabled = false,
  error = false,
  helperText,
  style,
}: DateInputProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const helperId = helperText ? `${autoId}-helper` : undefined;

  useClickOutside(containerRef, () => setOpen(false), open);

  const helperStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: error ? theme.colors.red[600] : theme.semantic.text.muted,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.space[4], ...style }}>
      <div ref={containerRef} style={{ position: 'relative' }}>
        <TriggerShell open={open} disabled={disabled} error={error} onClick={() => setOpen(o => !o)} ariaDescribedby={helperId}>
          <span style={{ flex: 1, color: value ? 'inherit' : theme.semantic.text.muted }}>
            {value ? formatDate(value) : placeholder}
          </span>
        </TriggerShell>

        {open && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 1000,
            background: theme.semantic.surface.card,
            borderRadius: theme.radius.md,
            boxShadow: theme.shadow.menu,
            border: `1px solid ${theme.semantic.border.subtle}`,
            padding: 16,
          }}>
            <InlineCalendar
              selected={value}
              onSelect={(d) => { onChange?.(d); setOpen(false); }}
              onClear={value ? () => { onChange?.(null); setOpen(false); } : undefined}
            />
          </div>
        )}
      </div>
      {helperText && <span id={helperId} style={helperStyle}>{helperText}</span>}
    </div>
  );
}

export function DateRangeInput({
  startDate,
  endDate,
  onChange,
  startPlaceholder = 'Start date',
  endPlaceholder = 'End date',
  disabled = false,
  error = false,
  helperText,
  style,
}: DateRangeInputProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [picking, setPicking] = useState<'start' | 'end'>('start');
  const [hovered, setHovered] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const helperId = helperText ? `${autoId}-helper` : undefined;

  useClickOutside(containerRef, () => setOpen(false), open);

  const handleSelect = (date: Date) => {
    if (picking === 'start') {
      onChange?.(date, null);
      setPicking('end');
    } else {
      if (startDate && date.getTime() < startDate.getTime()) {
        onChange?.(date, startDate);
      } else {
        onChange?.(startDate ?? null, date);
      }
      setPicking('start');
      setOpen(false);
    }
  };

  const handleClear = () => {
    onChange?.(null, null);
    setPicking('start');
    setOpen(false);
  };

  const triggerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    height: theme.controlHeight.md,
    padding: `0 ${theme.controlPadding.field}px`,
    borderRadius: theme.radius.sm,
    background: open ? theme.semantic.surface.card : theme.semantic.surface.subtle,
    border: error
      ? `2px solid ${theme.colors.red[600]}`
      : open
        ? `2px solid ${theme.semantic.border.focus}`
        : `1px solid ${theme.semantic.border.subtle}`,
    boxShadow: error
      ? theme.focusRing.danger
      : open
        ? theme.focusRing.primary
        : theme.shadow.xs,
    color: disabled ? theme.semantic.text.muted : theme.semantic.text.primary,
    fontFamily: theme.typeVariants.label.fontFamily,
    fontSize: theme.typeVariants.label.fontSize,
    fontWeight: theme.typeVariants.label.fontWeight,
    lineHeight: theme.typeVariants.label.lineHeight,
    transition: transition('background-color', 'border-color', 'box-shadow'),
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxSizing: 'border-box',
    userSelect: 'none',
  };

  const helperStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: error ? theme.colors.red[600] : theme.semantic.text.muted,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.space[4], ...style }}>
      <div ref={containerRef} style={{ position: 'relative' }}>
        <div
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          data-testid="date-range-input"
          onClick={() => { if (!disabled) { setOpen(o => !o); setPicking('start'); } }}
          onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !disabled) { e.preventDefault(); setOpen(o => !o); } }}
          style={triggerStyle}
        >
          <span style={{ fontSize: 15, flexShrink: 0, display: 'flex', alignItems: 'center', color: theme.semantic.icon.muted }}>
            &#x1F4C5;
          </span>
          <span style={{
            color: startDate ? 'inherit' : theme.semantic.text.muted,
            borderBottom: open && picking === 'start' ? `2px solid ${theme.semantic.fill.primary}` : '2px solid transparent',
            paddingBottom: 1,
          }}>
            {startDate ? formatDate(startDate) : startPlaceholder}
          </span>
          <span style={{ color: theme.semantic.text.muted, fontSize: 12 }}>&#x2192;</span>
          <span style={{
            color: endDate ? 'inherit' : theme.semantic.text.muted,
            borderBottom: open && picking === 'end' ? `2px solid ${theme.semantic.fill.primary}` : '2px solid transparent',
            paddingBottom: 1,
          }}>
            {endDate ? formatDate(endDate) : endPlaceholder}
          </span>
        </div>

        {open && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 1000,
            background: theme.semantic.surface.card,
            borderRadius: theme.radius.md,
            boxShadow: theme.shadow.menu,
            border: `1px solid ${theme.semantic.border.subtle}`,
            padding: 16,
          }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 12, fontWeight: theme.fontWeight.medium,
                color: theme.semantic.fill.primary, fontFamily: theme.fontFamily.sans,
                textTransform: 'uppercase', letterSpacing: 0.5,
              }}>
                {picking === 'start' ? 'Select start date' : 'Select end date'}
              </span>
            </div>
            <InlineCalendar
              rangeStart={startDate}
              rangeEnd={endDate}
              hovered={picking === 'end' ? hovered : null}
              onSelect={handleSelect}
              onHover={setHovered}
              onClear={(startDate || endDate) ? handleClear : undefined}
            />
          </div>
        )}
      </div>
      {helperText && <span id={helperId} style={helperStyle}>{helperText}</span>}
    </div>
  );
}
