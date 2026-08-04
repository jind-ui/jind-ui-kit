import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VStack } from './VStack';

describe('VStack', () => {
  it('renders as a vertical flex', () => {
    render(<VStack data-testid="vstack">items</VStack>);
    const el = screen.getByTestId('vstack');
    expect(el.style.display).toBe('flex');
    expect(el.style.flexDirection).toBe('column');
  });
});
