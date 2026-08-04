import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />);
    expect(screen.getByTestId('input-element')).toBeTruthy();
  });

  it('shows placeholder text', () => {
    render(<Input placeholder="Type here..." />);
    expect(screen.getByPlaceholderText('Type here...')).toBeTruthy();
  });

  it('handles controlled value', () => {
    render(<Input value="Hello" onChange={() => {}} />);
    const input = screen.getByTestId('input-element') as HTMLInputElement;
    expect(input.value).toBe('Hello');
  });

  it('handles uncontrolled with defaultValue', () => {
    render(<Input defaultValue="Default" />);
    const input = screen.getByTestId('input-element') as HTMLInputElement;
    expect(input.value).toBe('Default');
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByTestId('input-element');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledWith('abc');
  });

  it('renders disabled state', () => {
    const { container } = render(<Input disabled />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.opacity).toBe('0.6');
    expect(screen.getByTestId('input-element')).toHaveProperty('disabled', true);
  });

  it('renders with iconLeft', () => {
    const { container } = render(<Input iconLeft="@" />);
    const icon = container.querySelector('span');
    expect(icon).toBeTruthy();
    expect(icon!.textContent).toBe('@');
  });
});
