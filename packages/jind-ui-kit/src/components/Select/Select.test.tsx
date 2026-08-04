import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

const options = ['Apple', 'Banana', 'Cherry'];

describe('Select', () => {
  it('renders without crashing', () => {
    render(<Select options={options} />);
    expect(screen.getByTestId('select-trigger')).toBeTruthy();
  });

  it('shows placeholder when no value', () => {
    render(<Select options={options} placeholder="Pick a fruit" />);
    expect(screen.getByText('Pick a fruit')).toBeTruthy();
  });

  it('shows selected value label', () => {
    render(<Select options={options} value="Banana" />);
    expect(screen.getByText('Banana')).toBeTruthy();
  });

  it('opens dropdown on click', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByTestId('select-trigger'));
    const opts = screen.getAllByTestId('select-option');
    expect(opts).toHaveLength(3);
  });

  it('calls onChange when option selected', () => {
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} />);
    fireEvent.click(screen.getByTestId('select-trigger'));
    fireEvent.click(screen.getByText('Cherry'));
    expect(handleChange).toHaveBeenCalledWith('Cherry', { reason: 'click' });
  });

  it('disabled state prevents opening', () => {
    render(<Select options={options} disabled />);
    fireEvent.click(screen.getByTestId('select-trigger'));
    expect(screen.queryAllByTestId('select-option')).toHaveLength(0);
  });

  it('closes on click outside', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByTestId('select-trigger'));
    expect(screen.getAllByTestId('select-option')).toHaveLength(3);
    fireEvent.mouseDown(document.body);
    expect(screen.queryAllByTestId('select-option')).toHaveLength(0);
  });
});
