import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders without crashing', () => {
    render(<Calendar />);
    expect(screen.getByRole('grid', { name: 'Calendar' })).toBeTruthy();
  });

  it('shows correct month and year', () => {
    render(<Calendar year={2025} month={6} />);
    expect(screen.getByText('July 2025')).toBeTruthy();
  });

  it('shows day-of-week headers', () => {
    render(<Calendar year={2025} month={0} />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(7);
    expect(headers[0].textContent).toBe('S');
    expect(headers[1].textContent).toBe('M');
    expect(headers[6].textContent).toBe('S');
  });

  it('navigates to previous month', () => {
    render(<Calendar />);
    const prevButton = screen.getByLabelText('Previous month');
    const today = new Date();
    let expectedMonth = today.getMonth() - 1;
    let expectedYear = today.getFullYear();
    if (expectedMonth < 0) {
      expectedMonth = 11;
      expectedYear -= 1;
    }
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    fireEvent.click(prevButton);
    expect(
      screen.getByText(`${monthNames[expectedMonth]} ${expectedYear}`),
    ).toBeTruthy();
  });

  it('navigates to next month', () => {
    render(<Calendar />);
    const nextButton = screen.getByLabelText('Next month');
    const today = new Date();
    let expectedMonth = today.getMonth() + 1;
    let expectedYear = today.getFullYear();
    if (expectedMonth > 11) {
      expectedMonth = 0;
      expectedYear += 1;
    }
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    fireEvent.click(nextButton);
    expect(
      screen.getByText(`${monthNames[expectedMonth]} ${expectedYear}`),
    ).toBeTruthy();
  });

  it('selecting a day calls onSelect with the correct date', () => {
    const handleSelect = vi.fn();
    render(<Calendar year={2025} month={0} onSelect={handleSelect} />);
    // January 2025, click on day 15
    const dayButton = screen.getByLabelText('Wed Jan 15 2025');
    fireEvent.click(dayButton);
    expect(handleSelect).toHaveBeenCalledTimes(1);
    const selectedDate: Date = handleSelect.mock.calls[0][0];
    expect(selectedDate.getFullYear()).toBe(2025);
    expect(selectedDate.getMonth()).toBe(0);
    expect(selectedDate.getDate()).toBe(15);
  });

  it('clear button calls onClear', () => {
    const handleClear = vi.fn();
    render(<Calendar year={2025} month={0} onClear={handleClear} />);
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('does not show clear button when onClear is not provided', () => {
    render(<Calendar year={2025} month={0} />);
    expect(screen.queryByText('Clear')).toBeNull();
  });

  it('highlights the selected date', () => {
    const selected = new Date(2025, 0, 20);
    render(<Calendar year={2025} month={0} selected={selected} />);
    const dayButton = screen.getByLabelText('Mon Jan 20 2025');
    expect(dayButton.getAttribute('aria-selected')).toBe('true');
  });
});
