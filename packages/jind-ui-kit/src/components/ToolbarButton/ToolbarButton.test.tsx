import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToolbarButton } from './ToolbarButton';

describe('ToolbarButton', () => {
  it('renders without crashing', () => {
    render(<ToolbarButton name="bold" data-testid="tb" />);
    expect(screen.getByTestId('tb')).toBeTruthy();
  });

  it('renders with correct aria-label from label prop', () => {
    render(<ToolbarButton name="bold" label="Bold" />);
    expect(screen.getByLabelText('Bold')).toBeTruthy();
  });

  it('renders icon element', () => {
    render(<ToolbarButton name="bold" data-testid="tb" />);
    const btn = screen.getByTestId('tb');
    const icon = btn.querySelector('i.iconoir-bold');
    expect(icon).toBeTruthy();
  });

  it('active state shows indicator bar', () => {
    render(<ToolbarButton name="bold" active data-testid="tb" />);
    expect(screen.getByTestId('toolbar-active-bar')).toBeTruthy();
  });

  it('inactive state does not show indicator bar', () => {
    render(<ToolbarButton name="bold" data-testid="tb" />);
    expect(screen.queryByTestId('toolbar-active-bar')).toBeNull();
  });

  it('disabled state has disabled attribute and click does not fire', () => {
    const handleClick = vi.fn();
    render(
      <ToolbarButton name="bold" disabled onClick={handleClick} data-testid="tb" />,
    );
    const btn = screen.getByTestId('tb');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('click handler fires', () => {
    const handleClick = vi.fn();
    render(<ToolbarButton name="bold" onClick={handleClick} data-testid="tb" />);
    fireEvent.click(screen.getByTestId('tb'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('custom accent color is applied to bar when active', () => {
    render(
      <ToolbarButton name="bold" active accent="#ff0000" data-testid="tb" />,
    );
    const bar = screen.getByTestId('toolbar-active-bar');
    expect(bar.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });
});
