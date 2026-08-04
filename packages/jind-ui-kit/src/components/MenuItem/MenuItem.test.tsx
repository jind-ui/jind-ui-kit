import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MenuItem } from './MenuItem';

describe('MenuItem', () => {
  it('renders without crashing', () => {
    render(<MenuItem>Edit</MenuItem>);
    expect(screen.getByText('Edit')).toBeTruthy();
  });

  it('renders with role menuitem', () => {
    render(<MenuItem>Edit</MenuItem>);
    expect(screen.getByRole('menuitem')).toBeTruthy();
  });

  it('fires onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<MenuItem onClick={handleClick}>Edit</MenuItem>);
    fireEvent.click(screen.getByRole('menuitem'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <MenuItem disabled onClick={handleClick}>
        Edit
      </MenuItem>,
    );
    fireEvent.click(screen.getByRole('menuitem'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies disabled styling', () => {
    render(<MenuItem disabled>Disabled</MenuItem>);
    const item = screen.getByRole('menuitem');
    expect(item.style.opacity).toBe('0.5');
    expect(item.style.pointerEvents).toBe('none');
  });

  it('shows check mark when selected', () => {
    render(<MenuItem selected>Active</MenuItem>);
    const item = screen.getByRole('menuitem');
    expect(item.textContent).toContain('✓');
  });

  it('does not show check mark when not selected', () => {
    render(<MenuItem>Inactive</MenuItem>);
    const item = screen.getByRole('menuitem');
    expect(item.textContent).not.toContain('✓');
  });

  it('applies hover background on mouse enter', () => {
    render(<MenuItem>Hoverable</MenuItem>);
    const item = screen.getByRole('menuitem');
    fireEvent.mouseEnter(item);
    // surface.hover = #f9f9f9
    expect(item.style.backgroundColor).toBe('rgb(249, 249, 249)');
  });

  it('removes hover background on mouse leave', () => {
    render(<MenuItem>Hoverable</MenuItem>);
    const item = screen.getByRole('menuitem');
    fireEvent.mouseEnter(item);
    fireEvent.mouseLeave(item);
    expect(item.style.backgroundColor).toBe('transparent');
  });

  it('renders icon when provided', () => {
    render(<MenuItem icon="edit">Edit</MenuItem>);
    const item = screen.getByRole('menuitem');
    const icon = item.querySelector('i.iconoir-edit');
    expect(icon).toBeTruthy();
  });

  it('renders swatch when provided', () => {
    render(<MenuItem swatch="#e8503a">Red</MenuItem>);
    const item = screen.getByRole('menuitem');
    // swatch is a 26x26 div with the background color
    const swatch = item.querySelector('div');
    expect(swatch).toBeTruthy();
  });

  it('renders trailing content', () => {
    render(<MenuItem trailing={<span>Ctrl+E</span>}>Edit</MenuItem>);
    expect(screen.getByText('Ctrl+E')).toBeTruthy();
  });

  it('applies custom style', () => {
    render(<MenuItem style={{ marginTop: 5 }}>Styled</MenuItem>);
    const item = screen.getByRole('menuitem');
    expect(item.style.marginTop).toBe('5px');
  });

  it('has correct height', () => {
    render(<MenuItem>Item</MenuItem>);
    const item = screen.getByRole('menuitem');
    expect(item.style.height).toBe('48px');
  });
});
