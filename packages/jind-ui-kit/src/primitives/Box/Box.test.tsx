import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Box } from './Box';

describe('Box', () => {
  it('renders children', () => {
    render(<Box data-testid="box">content</Box>);
    expect(screen.getByTestId('box')).toHaveTextContent('content');
  });

  it('renders as a different element', () => {
    render(<Box as="section" data-testid="box">content</Box>);
    expect(screen.getByTestId('box').tagName).toBe('SECTION');
  });

  it('applies spacing props', () => {
    render(<Box data-testid="box" p={4}>content</Box>);
    expect(screen.getByTestId('box').style.padding).toBe('8px');
  });

  it('applies background color', () => {
    render(<Box data-testid="box" bg="#ff0000">content</Box>);
    expect(screen.getByTestId('box').style.background).toBe('rgb(255, 0, 0)');
  });

  it('applies width and height', () => {
    render(<Box data-testid="box" width={200} height={100}>content</Box>);
    expect(screen.getByTestId('box').style.width).toBe('200px');
    expect(screen.getByTestId('box').style.height).toBe('100px');
  });

  it('applies custom style', () => {
    render(<Box data-testid="box" style={{ opacity: 0.5 }}>content</Box>);
    expect(screen.getByTestId('box').style.opacity).toBe('0.5');
  });
});
