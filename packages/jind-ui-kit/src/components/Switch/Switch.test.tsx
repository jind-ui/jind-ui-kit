import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch />);
    expect(screen.getByTestId('switch-track')).toBeTruthy();
  });

  it('toggles on click (uncontrolled)', () => {
    render(<Switch />);
    const track = screen.getByTestId('switch-track');
    expect(track.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(track);
    expect(track.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(track);
    expect(track.getAttribute('aria-checked')).toBe('false');
  });

  it('respects controlled value', () => {
    const { rerender } = render(<Switch checked={true} />);
    const track = screen.getByTestId('switch-track');
    expect(track.getAttribute('aria-checked')).toBe('true');
    rerender(<Switch checked={false} />);
    expect(track.getAttribute('aria-checked')).toBe('false');
  });

  it('calls onChange when toggled', () => {
    const handleChange = vi.fn();
    render(<Switch onChange={handleChange} />);
    fireEvent.click(screen.getByTestId('switch-track'));
    expect(handleChange).toHaveBeenCalledWith(true, { reason: 'click' });
  });

  it('does not toggle when disabled', () => {
    const handleChange = vi.fn();
    render(<Switch disabled onChange={handleChange} />);
    const track = screen.getByTestId('switch-track');
    fireEvent.click(track);
    expect(handleChange).not.toHaveBeenCalled();
    expect(track.getAttribute('aria-checked')).toBe('false');
  });

  it('renders label when provided', () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeTruthy();
  });

  it('has correct aria-checked attribute', () => {
    render(<Switch defaultChecked={true} />);
    const track = screen.getByTestId('switch-track');
    expect(track.getAttribute('aria-checked')).toBe('true');
  });
});
