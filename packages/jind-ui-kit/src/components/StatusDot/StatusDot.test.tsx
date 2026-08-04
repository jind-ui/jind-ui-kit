import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusDot } from './StatusDot';

describe('StatusDot', () => {
  it('renders without crashing', () => {
    render(<StatusDot tone="info" />);
    expect(screen.getByTestId('status-dot')).toBeInTheDocument();
  });

  it('renders dot element', () => {
    render(<StatusDot tone="success" />);
    expect(screen.getByTestId('status-dot-indicator')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<StatusDot tone="info" label="Online" />);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const { container } = render(<StatusDot tone="info" />);
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(0);
  });

  it('applies sm size', () => {
    render(<StatusDot tone="info" size="sm" />);
    const dot = screen.getByTestId('status-dot-indicator');
    expect(dot.style.width).toBe('8px');
    expect(dot.style.height).toBe('8px');
  });

  it('applies md size by default', () => {
    render(<StatusDot tone="info" />);
    const dot = screen.getByTestId('status-dot-indicator');
    expect(dot.style.width).toBe('10px');
    expect(dot.style.height).toBe('10px');
  });

  it('applies lg size', () => {
    render(<StatusDot tone="info" size="lg" />);
    const dot = screen.getByTestId('status-dot-indicator');
    expect(dot.style.width).toBe('12px');
    expect(dot.style.height).toBe('12px');
  });

  it.each([
    'info', 'warning', 'success', 'danger', 'accent', 'brand', 'neutral', 'primary',
  ] as const)('renders %s tone without error', (tone) => {
    render(<StatusDot tone={tone} label={tone} />);
    expect(screen.getByText(tone)).toBeInTheDocument();
  });

  it('applies custom style', () => {
    render(<StatusDot tone="info" style={{ marginTop: 10 }} />);
    const el = screen.getByTestId('status-dot');
    expect(el.style.marginTop).toBe('10px');
  });
});
