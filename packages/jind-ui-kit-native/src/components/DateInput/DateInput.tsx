import { useState, type Ref } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface DateInputProps {
  ref?: Ref<View>;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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

interface CalendarCell {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
}

function buildGrid(year: number, month: number): CalendarCell[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const cells: CalendarCell[] = [];

  // Previous month trailing days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month, year, isCurrentMonth: true });
  }

  // Next month leading days
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({
      day: d,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
    });
  }

  return cells;
}

export function DateInput({
  ref,
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  style,
}: DateInputProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [viewYear, setViewYear] = useState(
    value ? value.getFullYear() : today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    value ? value.getMonth() : today.getMonth(),
  );

  const handleOpen = () => {
    if (disabled) return;
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
    setOpen(true);
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (cell: CalendarCell) => {
    const selected = new Date(cell.year, cell.month, cell.day);
    onChange?.(selected);
    setOpen(false);
  };

  const handleClear = () => {
    onChange?.(null);
    setOpen(false);
  };

  const cells = buildGrid(viewYear, viewMonth);

  // Trigger styles
  const triggerStyle: ViewStyle = {
    height: theme.controlHeight.md,
    paddingHorizontal: theme.controlPadding.field,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.semantic.surface.subtle,
    borderWidth: 1,
    borderColor: theme.semantic.border.subtle,
    ...theme.shadow.xs,
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const triggerTextStyle: TextStyle = {
    fontFamily: theme.typeVariants.control.fontFamily,
    fontSize: theme.typeVariants.control.fontSize,
    fontWeight: theme.typeVariants.control.fontWeight as TextStyle['fontWeight'],
    lineHeight: theme.typeVariants.control.fontSize * 1.4,
    color: value ? theme.semantic.text.primary : theme.semantic.text.muted,
  };

  const iconStyle: TextStyle = {
    fontSize: theme.fontSize[15],
    lineHeight: theme.fontSize[15] * 1.3,
  };

  // Modal styles
  const overlayStyle: ViewStyle = {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyle: ViewStyle = {
    padding: 16,
    borderRadius: theme.radius.md,
    backgroundColor: theme.semantic.surface.card,
    ...theme.shadow.menu,
    width: 330,
  };

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  };

  const headerTitleStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[15],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.fontSize[15] * 1.3,
    color: theme.semantic.text.primary,
  };

  const navButtonStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[15],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.fontSize[15] * 1.3,
    color: theme.semantic.text.link,
    paddingHorizontal: 8,
  };

  const dayLabelStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.fontSize[12] * 1.3,
    color: theme.semantic.text.muted,
    textAlign: 'center',
    width: 44,
  };

  const dayLabelRowStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 4,
  };

  const gridStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
  };

  const clearButtonStyle: ViewStyle = {
    alignSelf: 'center',
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
  };

  const clearTextStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.fontSize[13] * 1.3,
    color: theme.semantic.text.link,
  };

  return (
    <View ref={ref}>
      <Pressable
        style={triggerStyle}
        onPress={handleOpen}
        disabled={disabled}
        accessibilityRole="button"
      >
        <Text style={iconStyle}>{'\u{1F4C5}'}</Text>
        <Text style={triggerTextStyle}>
          {value ? formatDate(value) : placeholder}
        </Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={overlayStyle} onPress={() => setOpen(false)}>
          <Pressable style={cardStyle} onPress={() => {}}>
            {/* Header */}
            <View style={headerStyle}>
              <Pressable onPress={handlePrevMonth} accessibilityRole="button" accessibilityLabel="Previous month">
                <Text style={navButtonStyle}>{'‹'}</Text>
              </Pressable>
              <Text style={headerTitleStyle}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </Text>
              <Pressable onPress={handleNextMonth} accessibilityRole="button" accessibilityLabel="Next month">
                <Text style={navButtonStyle}>{'›'}</Text>
              </Pressable>
            </View>

            {/* Day labels */}
            <View style={dayLabelRowStyle}>
              {DAY_LABELS.map((label, i) => (
                <Text key={i} style={dayLabelStyle}>
                  {label}
                </Text>
              ))}
            </View>

            {/* Calendar grid */}
            <View style={gridStyle}>
              {cells.map((cell, i) => {
                const cellDate = new Date(cell.year, cell.month, cell.day);
                const isSelected = value ? isSameDay(cellDate, value) : false;
                const isToday = isSameDay(cellDate, today);

                const cellStyle: ViewStyle = {
                  width: 44,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: theme.radius.xs,
                  backgroundColor: isSelected
                    ? theme.semantic.fill.primary
                    : 'transparent',
                  borderWidth: isToday && !isSelected ? 1.5 : 0,
                  borderColor: isToday && !isSelected
                    ? theme.semantic.border.focus
                    : undefined,
                };

                const cellTextStyle: TextStyle = {
                  fontFamily: theme.fontFamily.sans,
                  fontSize: theme.fontSize[13],
                  fontWeight: theme.fontWeight.regular,
                  lineHeight: theme.fontSize[13] * 1.3,
                  color: isSelected
                    ? theme.semantic.text.inverse
                    : cell.isCurrentMonth
                      ? theme.semantic.text.primary
                      : theme.semantic.text.muted,
                };

                return (
                  <Pressable
                    key={i}
                    style={cellStyle}
                    onPress={() => handleSelectDay(cell)}
                    accessibilityRole="button"
                    accessibilityLabel={`${cell.day}`}
                  >
                    <Text style={cellTextStyle}>{cell.day}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Clear button */}
            {value != null && (
              <Pressable
                style={clearButtonStyle}
                onPress={handleClear}
                accessibilityRole="button"
              >
                <Text style={clearTextStyle}>Clear</Text>
              </Pressable>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
