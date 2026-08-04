import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders without crashing', () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('renders children text', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders dot when dot prop is true', () => {
    render(<Badge dot>With dot</Badge>);
    expect(screen.getByTestId('badge-dot')).toBeInTheDocument();
  });

  it('does not render dot when dot prop is absent', () => {
    render(<Badge>No dot</Badge>);
    expect(screen.queryByTestId('badge-dot')).not.toBeInTheDocument();
  });

  it('renders dismiss button when onDismiss provided', () => {
    render(<Badge onDismiss={() => {}}>Dismissible</Badge>);
    expect(screen.getByTestId('badge-dismiss')).toBeInTheDocument();
  });

  it('does not render dismiss button when onDismiss is absent', () => {
    render(<Badge>Not dismissible</Badge>);
    expect(screen.queryByTestId('badge-dismiss')).not.toBeInTheDocument();
  });

  it('calls onDismiss when dismiss clicked', async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(<Badge onDismiss={handleDismiss}>Dismiss me</Badge>);
    await user.click(screen.getByTestId('badge-dismiss'));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies tone colors for info (default)', () => {
    render(<Badge>Info</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.style.backgroundColor).toBeTruthy();
    expect(badge.style.color).toBeTruthy();
  });

  it('applies tone colors for neutral', () => {
    render(<Badge tone="neutral">Neutral</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.style.backgroundColor).toBeTruthy();
    expect(badge.style.color).toBeTruthy();
  });

  it('applies tone colors for primary', () => {
    render(<Badge tone="primary">Primary</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.style.backgroundColor).toBeTruthy();
    expect(badge.style.color).toBeTruthy();
  });

  it('applies tone colors for danger', () => {
    render(<Badge tone="danger">Danger</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.style.backgroundColor).toBeTruthy();
    expect(badge.style.color).toBeTruthy();
  });

  it('applies tone colors for success', () => {
    render(<Badge tone="success">Success</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.style.backgroundColor).toBeTruthy();
    expect(badge.style.color).toBeTruthy();
  });

  it('applies tone colors for warning', () => {
    render(<Badge tone="warning">Warning</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.style.backgroundColor).toBeTruthy();
    expect(badge.style.color).toBeTruthy();
  });

  it('applies tone colors for accent', () => {
    render(<Badge tone="accent">Accent</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.style.backgroundColor).toBeTruthy();
    expect(badge.style.color).toBeTruthy();
  });

  it('applies tone colors for brand', () => {
    render(<Badge tone="brand">Brand</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.style.backgroundColor).toBeTruthy();
    expect(badge.style.color).toBeTruthy();
  });

  it('applies custom style', () => {
    render(<Badge style={{ marginTop: 10 }}>Styled</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.style.marginTop).toBe('10px');
  });
});
