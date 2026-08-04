import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Menu } from './Menu';

describe('Menu', () => {
  it('renders without crashing', () => {
    render(
      <Menu>
        <div>Item</div>
      </Menu>,
    );
    expect(screen.getByRole('menu')).toBeTruthy();
  });

  it('renders children', () => {
    render(
      <Menu>
        <div>First</div>
        <div>Second</div>
      </Menu>,
    );
    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
  });

  it('renders header when provided', () => {
    render(
      <Menu header="Actions">
        <div>Item</div>
      </Menu>,
    );
    expect(screen.getByText('Actions')).toBeTruthy();
  });

  it('does not render header when not provided', () => {
    render(
      <Menu>
        <div>Item</div>
      </Menu>,
    );
    expect(screen.queryByText('Actions')).toBeNull();
  });

  it('applies width', () => {
    render(
      <Menu width={240}>
        <div>Item</div>
      </Menu>,
    );
    const menu = screen.getByRole('menu');
    expect(menu.style.width).toBe('240px');
  });

  it('applies custom style', () => {
    render(
      <Menu style={{ marginTop: 10 }}>
        <div>Item</div>
      </Menu>,
    );
    const menu = screen.getByRole('menu');
    expect(menu.style.marginTop).toBe('10px');
  });

  it('has correct background and shadow from theme defaults', () => {
    render(
      <Menu>
        <div>Item</div>
      </Menu>,
    );
    const menu = screen.getByRole('menu');
    // surface.card = #ffffff
    expect(menu.style.background).toBe('rgb(255, 255, 255)');
    // shadow.menu
    expect(menu.style.boxShadow).toBeTruthy();
  });
});
