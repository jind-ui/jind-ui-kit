import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  it('renders as span by default', () => {
    render(<Text data-testid="text">hello</Text>);
    expect(screen.getByTestId('text').tagName).toBe('SPAN');
    expect(screen.getByTestId('text')).toHaveTextContent('hello');
  });

  it('renders as a different element', () => {
    render(<Text as="p" data-testid="text">hello</Text>);
    expect(screen.getByTestId('text').tagName).toBe('P');
  });

  it('applies truncate styles', () => {
    render(<Text data-testid="text" truncate>long text</Text>);
    const el = screen.getByTestId('text');
    expect(el.style.overflow).toBe('hidden');
    expect(el.style.textOverflow).toBe('ellipsis');
    expect(el.style.whiteSpace).toBe('nowrap');
  });

  it('applies tabular-nums', () => {
    render(<Text data-testid="text" tabular>123</Text>);
    expect(screen.getByTestId('text').style.fontVariantNumeric).toBe('tabular-nums');
  });

  it('applies custom color', () => {
    render(<Text data-testid="text" color="#ff0000">colored</Text>);
    expect(screen.getByTestId('text').style.color).toBe('rgb(255, 0, 0)');
  });
});
