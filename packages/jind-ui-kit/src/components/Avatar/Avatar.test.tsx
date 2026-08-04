import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders without crashing', () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" name="Jane Doe" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(img).toHaveAttribute('alt', 'Jane Doe');
  });

  it('renders initials when name is provided without src', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders single initial for single name', () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders correct size for sm', () => {
    const { container } = render(<Avatar name="AB" size="sm" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('24px');
    expect(el.style.height).toBe('24px');
  });

  it('renders correct size for md', () => {
    const { container } = render(<Avatar name="AB" size="md" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('32px');
    expect(el.style.height).toBe('32px');
  });

  it('renders correct size for lg', () => {
    const { container } = render(<Avatar name="AB" size="lg" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('40px');
    expect(el.style.height).toBe('40px');
  });

  it('renders empty circle when no src or name', () => {
    const { container } = render(<Avatar />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.borderRadius).toBe('50%');
    expect(el.textContent).toBe('');
  });

  it('applies custom style', () => {
    const { container } = render(<Avatar name="AB" style={{ border: '2px solid red' }} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.border).toBe('2px solid red');
  });
});
