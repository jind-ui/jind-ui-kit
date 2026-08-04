import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders without crashing', () => {
    render(<Chip>Filter</Chip>);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('renders children text', () => {
    render(<Chip>Category</Chip>);
    expect(screen.getByText('Category')).toBeTruthy();
  });

  it('renders icon when icon prop provided', () => {
    render(<Chip icon="home">Home</Chip>);
    const btn = screen.getByRole('button');
    const icon = btn.querySelector('i');
    expect(icon).toBeTruthy();
    expect(icon!.className).toContain('iconoir-home');
  });

  it('applies selected styles', () => {
    render(<Chip selected>Active</Chip>);
    const btn = screen.getByRole('button');
    expect(btn.style.color).toBe('rgb(26, 114, 246)');
    expect(btn.style.borderColor).toBe('rgb(26, 114, 246)');
  });

  it('applies disabled state', () => {
    render(<Chip disabled>Off</Chip>);
    const btn = screen.getByRole('button');
    expect(btn.style.opacity).toBe('0.5');
    expect(btn).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Chip onClick={handleClick}>Click</Chip>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Chip disabled onClick={handleClick}>
        Nope
      </Chip>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
