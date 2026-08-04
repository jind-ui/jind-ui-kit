import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders as separator', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders horizontal by default', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders vertical', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });
});
