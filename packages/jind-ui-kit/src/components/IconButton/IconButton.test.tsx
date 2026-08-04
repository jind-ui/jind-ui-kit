import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders without crashing', () => {
    render(<IconButton icon="plus" label="Add" />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('renders tile variant by default', () => {
    render(<IconButton icon="plus" label="Add" />);
    const button = screen.getByRole('button');
    expect(button.style.border).toContain('solid');
    expect(button.style.border).not.toContain('transparent');
  });

  it('renders ghost variant', () => {
    render(<IconButton icon="plus" label="Add" variant="ghost" />);
    const button = screen.getByRole('button');
    expect(button.style.border).toContain('transparent');
  });

  it('renders in lg size', () => {
    render(<IconButton icon="plus" label="Add" size="lg" />);
    const button = screen.getByRole('button');
    expect(button.style.width).toBe('44px');
    expect(button.style.height).toBe('44px');
  });

  it('renders in md size', () => {
    render(<IconButton icon="plus" label="Add" size="md" />);
    const button = screen.getByRole('button');
    expect(button.style.width).toBe('40px');
    expect(button.style.height).toBe('40px');
  });

  it('renders in sm size', () => {
    render(<IconButton icon="plus" label="Add" size="sm" />);
    const button = screen.getByRole('button');
    expect(button.style.width).toBe('28px');
    expect(button.style.height).toBe('28px');
  });

  it('has disabled attribute and does not fire click when disabled', () => {
    const handleClick = vi.fn();
    render(
      <IconButton icon="plus" label="Add" disabled onClick={handleClick} />,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('fires click handler', () => {
    const handleClick = vi.fn();
    render(<IconButton icon="plus" label="Add" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with aria-label from label prop', () => {
    render(<IconButton icon="trash" label="Delete item" />);
    expect(screen.getByLabelText('Delete item')).toBeTruthy();
  });

  it('renders danger tone', () => {
    render(<IconButton icon="trash" label="Delete" tone="danger" />);
    const button = screen.getByRole('button');
    const icon = button.querySelector('i');
    expect(icon).toBeTruthy();
  });

  it('renders as a different element via as prop', () => {
    render(<IconButton icon="link" label="Link" as="a" href="/home" />);
    const link = screen.getByLabelText('Link');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/home');
  });
});
