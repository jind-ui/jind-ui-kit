import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DayToggle } from './DayToggle';

describe('DayToggle', () => {
  it('renders without crashing', () => {
    render(<DayToggle>Mon</DayToggle>);
    expect(screen.getByTestId('day-toggle')).toBeInTheDocument();
  });

  it('renders children text', () => {
    render(<DayToggle>Mon</DayToggle>);
    expect(screen.getByText('Mon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<DayToggle onClick={handleClick}>Mon</DayToggle>);
    fireEvent.click(screen.getByTestId('day-toggle'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies selected styling', () => {
    render(<DayToggle selected>Mon</DayToggle>);
    const el = screen.getByTestId('day-toggle');
    expect(el.style.background).toBe('rgb(26, 114, 246)');
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <DayToggle disabled onClick={handleClick}>
        Mon
      </DayToggle>,
    );
    fireEvent.click(screen.getByTestId('day-toggle'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies disabled styling', () => {
    render(<DayToggle disabled>Mon</DayToggle>);
    const el = screen.getByTestId('day-toggle');
    expect(el.style.opacity).toBe('0.5');
  });
});
