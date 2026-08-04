import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressStat } from './ProgressStat';

describe('ProgressStat', () => {
  it('renders without crashing', () => {
    render(<ProgressStat />);
    expect(screen.getByTestId('progress-fill')).toBeTruthy();
  });

  it('displays value/total text', () => {
    render(<ProgressStat value={25} total={100} />);
    expect(screen.getByText('25/100')).toBeTruthy();
  });

  it('displays caption text', () => {
    render(<ProgressStat caption="completed" />);
    expect(screen.getByText('completed')).toBeTruthy();
  });

  it('bar fill width is correct percentage', () => {
    render(<ProgressStat value={50} total={200} />);
    const fill = screen.getByTestId('progress-fill');
    expect(fill.style.width).toBe('25%');
  });

  it('defaults to 0/100', () => {
    render(<ProgressStat />);
    expect(screen.getByText('0/100')).toBeTruthy();
    const fill = screen.getByTestId('progress-fill');
    expect(fill.style.width).toBe('0%');
  });

  it('clamps fill width to 100% when value > total', () => {
    render(<ProgressStat value={150} total={100} />);
    const fill = screen.getByTestId('progress-fill');
    expect(fill.style.width).toBe('100%');
  });

  it('applies custom style', () => {
    render(<ProgressStat style={{ maxWidth: 300 }} />);
    const container = screen.getByTestId('progress-fill').parentElement!.parentElement!;
    expect(container.style.maxWidth).toBe('300px');
  });
});
