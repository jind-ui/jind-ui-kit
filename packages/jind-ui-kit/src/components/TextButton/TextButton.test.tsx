import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TextButton } from './TextButton';

describe('TextButton', () => {
  it('renders without crashing', () => {
    render(<TextButton variant="plain">Click me</TextButton>);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('renders plain variant with no chevron icon', () => {
    render(<TextButton variant="plain">Plain</TextButton>);
    const btn = screen.getByText('Plain').closest('button')!;
    const icon = btn.querySelector('i');
    expect(icon).toBeNull();
  });

  it('renders link variant with arrow-up-right icon', () => {
    render(<TextButton variant="link">Link</TextButton>);
    const btn = screen.getByText('Link').closest('button')!;
    const icon = btn.querySelector('i.iconoir-arrow-up-right');
    expect(icon).toBeTruthy();
  });

  it('renders dropdown variant with nav-arrow-down icon', () => {
    render(<TextButton variant="dropdown">Dropdown</TextButton>);
    const btn = screen.getByText('Dropdown').closest('button')!;
    const icon = btn.querySelector('i.iconoir-nav-arrow-down');
    expect(icon).toBeTruthy();
  });

  it('renders sort variant with data-transfer-both icon', () => {
    render(<TextButton variant="sort">Sort</TextButton>);
    const btn = screen.getByText('Sort').closest('button')!;
    const icon = btn.querySelector('i.iconoir-data-transfer-both');
    expect(icon).toBeTruthy();
  });

  it('disabled state has disabled attribute and click does not fire', () => {
    const handleClick = vi.fn();
    render(
      <TextButton variant="plain" disabled onClick={handleClick}>
        Disabled
      </TextButton>,
    );
    const btn = screen.getByText('Disabled').closest('button')!;
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('fires click handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <TextButton variant="plain" onClick={handleClick}>
        Clickable
      </TextButton>,
    );
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('chevronSide left renders icon before text', () => {
    render(
      <TextButton variant="link" chevronSide="left">
        Left Icon
      </TextButton>,
    );
    const btn = screen.getByText('Left Icon').closest('button')!;
    const children = Array.from(btn.childNodes);
    const iconIndex = children.findIndex(
      (node) =>
        node instanceof HTMLElement &&
        node.classList.contains('iconoir-arrow-up-right'),
    );
    const textIndex = children.findIndex(
      (node) => node.textContent === 'Left Icon' && node.nodeType === Node.TEXT_NODE,
    );
    expect(iconIndex).toBeLessThan(textIndex);
  });

  it('chevronSide right (default) renders icon after text', () => {
    render(<TextButton variant="link">Right Icon</TextButton>);
    const btn = screen.getByText('Right Icon').closest('button')!;
    const children = Array.from(btn.childNodes);
    const iconIndex = children.findIndex(
      (node) =>
        node instanceof HTMLElement &&
        node.classList.contains('iconoir-arrow-up-right'),
    );
    const textIndex = children.findIndex(
      (node) => node.textContent === 'Right Icon' && node.nodeType === Node.TEXT_NODE,
    );
    expect(textIndex).toBeLessThan(iconIndex);
  });
});
