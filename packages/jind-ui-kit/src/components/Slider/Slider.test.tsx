import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders with role slider', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('has correct aria attributes', () => {
    render(<Slider value={50} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  it('shows label', () => {
    render(<Slider label="Volume" />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('shows value when showValue is true', () => {
    render(<Slider value={75} showValue />);
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('handles keyboard ArrowRight', () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(51, { reason: 'keyboard' });
  });

  it('handles keyboard ArrowLeft', () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(49, { reason: 'keyboard' });
  });

  it('respects disabled', () => {
    render(<Slider disabled />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
  });
});
