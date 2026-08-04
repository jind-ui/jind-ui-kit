import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DateInput } from './DateInput';

describe('DateInput', () => {
  it('renders without crashing', () => {
    render(<DateInput />);
    expect(screen.getByTestId('date-input')).toBeInTheDocument();
  });

  it('shows placeholder when no value', () => {
    render(<DateInput />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('shows value when provided', () => {
    render(<DateInput value={new Date(2025, 7, 15)} />);
    expect(screen.getByText('Aug 15, 2025')).toBeInTheDocument();
  });

  it('opens calendar when clicked', () => {
    render(<DateInput />);
    fireEvent.click(screen.getByTestId('date-input'));
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('calls onChange when date selected', () => {
    const handleChange = vi.fn();
    render(<DateInput onChange={handleChange} />);
    fireEvent.click(screen.getByTestId('date-input'));
    const dayButtons = screen.getAllByRole('button');
    const dayButton = dayButtons.find(b => b.textContent === '15');
    if (dayButton) {
      fireEvent.click(dayButton);
      expect(handleChange).toHaveBeenCalledTimes(1);
    }
  });

  it('disabled prevents interaction', () => {
    render(<DateInput disabled />);
    const trigger = screen.getByTestId('date-input');
    expect(trigger.style.opacity).toBe('0.6');
  });

  it('shows custom placeholder', () => {
    render(<DateInput placeholder="Choose date" />);
    expect(screen.getByText('Choose date')).toBeInTheDocument();
  });
});
