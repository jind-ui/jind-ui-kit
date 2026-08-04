import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders without crashing', () => {
    render(<Textarea />);
    expect(screen.getByTestId('textarea-element')).toBeTruthy();
  });

  it('shows placeholder text', () => {
    render(<Textarea placeholder="Write something..." />);
    const el = screen.getByTestId('textarea-element');
    expect(el.getAttribute('placeholder')).toBe('Write something...');
  });

  it('renders with custom rows', () => {
    render(<Textarea rows={3} />);
    const el = screen.getByTestId('textarea-element');
    expect(el.getAttribute('rows')).toBe('3');
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const el = screen.getByTestId('textarea-element');
    fireEvent.change(el, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledWith('Hello');
  });

  it('disabled state', () => {
    render(<Textarea disabled />);
    const el = screen.getByTestId('textarea-element') as HTMLTextAreaElement;
    expect(el.disabled).toBe(true);
    expect(el.style.cursor).toBe('not-allowed');
    expect(el.style.opacity).toBe('0.6');
  });

  it('default placeholder is "Enter a message"', () => {
    render(<Textarea />);
    const el = screen.getByTestId('textarea-element');
    expect(el.getAttribute('placeholder')).toBe('Enter a message');
  });
});
