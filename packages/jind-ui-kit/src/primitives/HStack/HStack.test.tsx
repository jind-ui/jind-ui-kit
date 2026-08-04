import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HStack } from './HStack';

describe('HStack', () => {
  it('renders as a horizontal flex', () => {
    render(<HStack data-testid="hstack">items</HStack>);
    const el = screen.getByTestId('hstack');
    expect(el.style.display).toBe('flex');
    expect(el.style.flexDirection).toBe('row');
    expect(el.style.alignItems).toBe('center');
  });

  it('renders children', () => {
    render(<HStack data-testid="hstack"><span>A</span><span>B</span></HStack>);
    expect(screen.getByTestId('hstack').children).toHaveLength(2);
  });
});
