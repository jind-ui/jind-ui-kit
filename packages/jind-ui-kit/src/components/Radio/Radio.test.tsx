import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Radio, RadioGroup } from './Radio';

function TestRadioGroup({
  defaultValue,
  onChange,
}: {
  defaultValue?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <RadioGroup defaultValue={defaultValue} onChange={onChange} name="test-group">
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
      <Radio value="c" label="Option C" disabled />
    </RadioGroup>
  );
}

describe('Radio', () => {
  it('renders without crashing', () => {
    render(<TestRadioGroup />);
    expect(screen.getByRole('radiogroup')).toBeTruthy();
  });

  it('renders all radio options', () => {
    render(<TestRadioGroup />);
    expect(screen.getByText('Option A')).toBeTruthy();
    expect(screen.getByText('Option B')).toBeTruthy();
    expect(screen.getByText('Option C')).toBeTruthy();
  });

  it('selects the default value', () => {
    render(<TestRadioGroup defaultValue="a" />);
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);
  });

  it('changes selection on click', () => {
    render(<TestRadioGroup defaultValue="a" />);
    fireEvent.click(screen.getByText('Option B'));
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios[1].checked).toBe(true);
    expect(radios[0].checked).toBe(false);
  });

  it('calls onChange when selection changes', () => {
    const onChange = vi.fn();
    render(<TestRadioGroup defaultValue="a" onChange={onChange} />);
    fireEvent.click(screen.getByText('Option B'));
    expect(onChange).toHaveBeenCalledWith('b', { reason: 'click' });
  });

  it('does not select a disabled option', () => {
    const onChange = vi.fn();
    render(<TestRadioGroup defaultValue="a" onChange={onChange} />);
    fireEvent.click(screen.getByText('Option C'));
    // onChange should not fire for disabled
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders radio inputs with correct name', () => {
    render(<TestRadioGroup />);
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    radios.forEach((r) => {
      expect(r.name).toBe('test-group');
    });
  });

  it('disabled radio has disabled attribute', () => {
    render(<TestRadioGroup />);
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios[2].disabled).toBe(true);
  });
});
