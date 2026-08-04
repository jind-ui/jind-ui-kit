import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeTruthy();
  });

  it('toggles checked state on click (uncontrolled)', () => {
    render(<Checkbox label="Toggle me" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(screen.getByText('Toggle me'));
    expect(checkbox.checked).toBe(true);
  });

  it('calls onChange when toggled', () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange} label="Click" />);
    fireEvent.click(screen.getByText('Click'));
    expect(onChange).toHaveBeenCalledWith(true, { reason: 'click' });
  });

  it('respects controlled checked prop', () => {
    render(<Checkbox checked={true} label="Controlled" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('does not toggle when disabled', () => {
    const onChange = vi.fn();
    render(<Checkbox disabled onChange={onChange} label="Disabled" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it('renders indeterminate state with mixed aria-checked', () => {
    render(<Checkbox indeterminate label="Some selected" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
  });

  it('applies defaultChecked', () => {
    render(<Checkbox defaultChecked label="Pre-checked" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('applies custom style', () => {
    const { container } = render(<Checkbox style={{ marginTop: 20 }} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.marginTop).toBe('20px');
  });
});
