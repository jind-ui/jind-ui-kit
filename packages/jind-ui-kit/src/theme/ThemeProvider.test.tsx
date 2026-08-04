import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { JindProvider, useTheme } from './ThemeProvider';
import { createTheme } from './theme';

function ThemeConsumer() {
  const theme = useTheme();
  return <div data-testid="consumer">{theme.semantic.fill.primary}</div>;
}

describe('JindProvider', () => {
  it('provides default theme', () => {
    render(
      <JindProvider>
        <ThemeConsumer />
      </JindProvider>,
    );
    expect(screen.getByTestId('consumer')).toHaveTextContent('#1a72f6');
  });

  it('provides custom theme', () => {
    const custom = createTheme({
      semantic: { fill: { primary: '#ff0000' } },
    } as any);
    render(
      <JindProvider theme={custom}>
        <ThemeConsumer />
      </JindProvider>,
    );
    expect(screen.getByTestId('consumer')).toHaveTextContent('#ff0000');
  });

  it('useTheme works without provider (returns default)', () => {
    render(<ThemeConsumer />);
    expect(screen.getByTestId('consumer')).toHaveTextContent('#1a72f6');
  });
});
