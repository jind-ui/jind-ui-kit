import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders without crashing', () => {
    render(<Icon name="home" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies iconoir class name', () => {
    render(<Icon name="home" />);
    const icon = screen.getByTestId('icon');
    expect(icon.className).toContain('iconoir-home');
  });

  it('applies default size (18px)', () => {
    render(<Icon name="home" />);
    const icon = screen.getByTestId('icon');
    expect(icon.style.fontSize).toBe('18px');
    expect(icon.style.width).toBe('18px');
    expect(icon.style.height).toBe('18px');
  });

  it('applies custom size', () => {
    render(<Icon name="home" size={24} />);
    const icon = screen.getByTestId('icon');
    expect(icon.style.fontSize).toBe('24px');
    expect(icon.style.width).toBe('24px');
    expect(icon.style.height).toBe('24px');
  });

  it('applies default color (currentColor)', () => {
    render(<Icon name="home" />);
    const icon = screen.getByTestId('icon');
    expect(icon.style.color.toLowerCase()).toBe('currentcolor');
  });

  it('applies custom color', () => {
    render(<Icon name="home" color="#e8503a" />);
    const icon = screen.getByTestId('icon');
    expect(icon.style.color).toBeTruthy();
  });

  it('applies custom className alongside iconoir class', () => {
    render(<Icon name="home" className="my-custom-class" />);
    const icon = screen.getByTestId('icon');
    expect(icon.className).toContain('iconoir-home');
    expect(icon.className).toContain('my-custom-class');
  });

  it('applies custom style', () => {
    render(<Icon name="home" style={{ marginRight: 8 }} />);
    const icon = screen.getByTestId('icon');
    expect(icon.style.marginRight).toBe('8px');
  });
});
