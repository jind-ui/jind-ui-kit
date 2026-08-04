import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders as grid', () => {
    render(<Grid data-testid="grid" columns={3}>items</Grid>);
    const el = screen.getByTestId('grid');
    expect(el.style.display).toBe('grid');
    expect(el.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  it('accepts string columns', () => {
    render(<Grid data-testid="grid" columns="200px 1fr">items</Grid>);
    expect(screen.getByTestId('grid').style.gridTemplateColumns).toBe('200px 1fr');
  });

  it('applies gap props', () => {
    render(<Grid data-testid="grid" columns={2} gap={6}>items</Grid>);
    expect(screen.getByTestId('grid').style.gap).toBe('12px');
  });
});
