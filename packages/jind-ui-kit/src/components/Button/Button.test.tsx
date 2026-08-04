import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('renders primary variant by default', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByText('Primary');
    expect(btn.style.background).toBe('rgb(26, 114, 246)');
    expect(btn.style.color).toBe('rgb(255, 255, 255)');
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByText('Secondary');
    expect(btn.style.background).toBe('rgb(255, 255, 255)');
    expect(btn.style.borderColor).not.toBe('transparent');
  });

  it('renders sm size', () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByText('Small');
    expect(btn.style.height).toBe('32px');
  });

  it('disabled state has disabled attribute and does not fire click handler', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    const btn = screen.getByText('Disabled');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('fires click handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a different element via as prop', () => {
    render(
      <Button as="a" href="https://example.com">
        Link
      </Button>,
    );
    const el = screen.getByText('Link');
    expect(el.tagName).toBe('A');
    expect(el.getAttribute('href')).toBe('https://example.com');
  });

  it('renders with left icon', () => {
    render(<Button iconLeft="plus">Add</Button>);
    const btn = screen.getByText('Add');
    const icon = btn.querySelector('i.iconoir-plus');
    expect(icon).toBeTruthy();
  });

  it('renders with right icon', () => {
    render(<Button iconRight="arrow-right">Next</Button>);
    const btn = screen.getByText('Next');
    const icon = btn.querySelector('i.iconoir-arrow-right');
    expect(icon).toBeTruthy();
  });

  it('renders as icon-only when no children provided', () => {
    render(<Button iconLeft="settings" data-testid="icon-btn" />);
    const btn = screen.getByTestId('icon-btn');
    // icon-only md: width and height should both be 44px
    expect(btn.style.width).toBe('44px');
    expect(btn.style.height).toBe('44px');
  });

  it('applies fullWidth', () => {
    render(<Button fullWidth>Full</Button>);
    const btn = screen.getByText('Full');
    expect(btn.style.width).toBe('100%');
  });
});
