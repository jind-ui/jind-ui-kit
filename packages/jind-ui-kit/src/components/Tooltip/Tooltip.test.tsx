import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children', () => {
    render(
      <Tooltip content="Hint">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByText('Hover me')).toBeTruthy();
  });

  it('does not show tooltip by default', () => {
    render(
      <Tooltip content="Hint">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('shows tooltip on mouse enter after delay', () => {
    render(
      <Tooltip content="Hint" delay={200}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(wrapper);

    // Not visible before delay
    expect(screen.queryByRole('tooltip')).toBeNull();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByRole('tooltip')).toBeTruthy();
    expect(screen.getByText('Hint')).toBeTruthy();
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Hint" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(wrapper);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByRole('tooltip')).toBeTruthy();

    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('clears timeout on mouse leave before delay finishes', () => {
    render(
      <Tooltip content="Hint" delay={500}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(wrapper);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    fireEvent.mouseLeave(wrapper);

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('renders with bottom placement', () => {
    render(
      <Tooltip content="Below" placement="bottom" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(wrapper);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.style.top).toBe('calc(100% + 8px)');
  });

  it('renders with left placement', () => {
    render(
      <Tooltip content="Left" placement="left" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(wrapper);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.style.right).toBe('calc(100% + 8px)');
  });

  it('renders with right placement', () => {
    render(
      <Tooltip content="Right" placement="right" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(wrapper);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.style.left).toBe('calc(100% + 8px)');
  });

  it('tooltip has pointer-events none', () => {
    render(
      <Tooltip content="Hint" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(wrapper);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.style.pointerEvents).toBe('none');
  });
});
