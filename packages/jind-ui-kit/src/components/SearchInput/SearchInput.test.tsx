import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders without crashing', () => {
    render(<SearchInput />);
    expect(screen.getByRole('searchbox')).toBeTruthy();
  });

  it('shows placeholder text', () => {
    render(<SearchInput placeholder="Find items..." />);
    expect(screen.getByPlaceholderText('Find items...')).toBeTruthy();
  });

  it('uses default placeholder', () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<SearchInput onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalledWith('hello');
  });

  it('shows clear button when value is non-empty', () => {
    render(<SearchInput value="test" />);
    expect(screen.getByLabelText('Clear search')).toBeTruthy();
  });

  it('hides clear button when value is empty', () => {
    render(<SearchInput value="" />);
    const btn = screen.queryByLabelText('Clear search');
    expect(btn?.style.visibility).toBe('hidden');
  });

  it('calls onClear when clear button is clicked', () => {
    const onClear = vi.fn();
    render(<SearchInput value="test" onClear={onClear} />);
    fireEvent.click(screen.getByLabelText('Clear search'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('clears value internally when no onClear provided (uncontrolled)', () => {
    render(<SearchInput defaultValue="hello" />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('hello');
    fireEvent.click(screen.getByLabelText('Clear search'));
    expect(input.value).toBe('');
  });

  it('applies disabled state', () => {
    render(<SearchInput disabled />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('applies custom style', () => {
    const { container } = render(<SearchInput style={{ maxWidth: 300 }} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.maxWidth).toBe('300px');
  });
});
