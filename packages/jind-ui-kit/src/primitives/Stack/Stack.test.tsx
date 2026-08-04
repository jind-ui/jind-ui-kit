import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders as column by default', () => {
    render(<Stack data-testid="stack">items</Stack>);
    const el = screen.getByTestId('stack');
    expect(el.style.display).toBe('flex');
    expect(el.style.flexDirection).toBe('column');
  });

  it('renders as row when directed', () => {
    render(<Stack data-testid="stack" direction="row">items</Stack>);
    expect(screen.getByTestId('stack').style.flexDirection).toBe('row');
  });

  it('applies gap', () => {
    render(<Stack data-testid="stack" gap={6}>items</Stack>);
    expect(screen.getByTestId('stack').style.gap).toBe('12px');
  });

  it('applies alignment', () => {
    render(<Stack data-testid="stack" align="center" justify="space-between">items</Stack>);
    const el = screen.getByTestId('stack');
    expect(el.style.alignItems).toBe('center');
    expect(el.style.justifyContent).toBe('space-between');
  });
});
