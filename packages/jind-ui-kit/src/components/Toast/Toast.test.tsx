import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders without crashing', () => {
    render(<Toast tone="neutral">Hello</Toast>);
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('renders children text', () => {
    render(<Toast tone="success">Operation successful</Toast>);
    expect(screen.getByText('Operation successful')).toBeTruthy();
  });

  it('renders icon when provided', () => {
    render(<Toast tone="info" icon="i">Info message</Toast>);
    expect(screen.getByText('i')).toBeTruthy();
  });

  it('renders dismiss button when onDismiss is provided', () => {
    const onDismiss = vi.fn();
    render(<Toast tone="danger" onDismiss={onDismiss}>Error</Toast>);
    const button = screen.getByLabelText('Dismiss');
    expect(button).toBeTruthy();
  });

  it('calls onDismiss when dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    render(<Toast tone="danger" onDismiss={onDismiss}>Error</Toast>);
    fireEvent.click(screen.getByLabelText('Dismiss'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render dismiss button when onDismiss is not provided', () => {
    render(<Toast tone="warning">Warning</Toast>);
    expect(screen.queryByLabelText('Dismiss')).toBeNull();
  });

  it('applies custom style', () => {
    render(<Toast tone="neutral" style={{ marginTop: 10 }}>Styled</Toast>);
    const el = screen.getByRole('status');
    expect(el.style.marginTop).toBe('10px');
  });

  it('renders all tone variants without error', () => {
    const tones = ['neutral', 'primary', 'danger', 'success', 'warning', 'info', 'accent', 'brand'] as const;
    tones.forEach((tone) => {
      const { unmount } = render(<Toast tone={tone}>Test</Toast>);
      unmount();
    });
  });
});
