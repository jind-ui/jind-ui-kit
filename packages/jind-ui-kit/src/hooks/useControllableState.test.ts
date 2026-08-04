import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useControllableState } from './useControllableState';

describe('useControllableState', () => {
  it('works uncontrolled with default value', () => {
    const { result } = renderHook(() => useControllableState(undefined, 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('updates uncontrolled state', () => {
    const { result } = renderHook(() => useControllableState(undefined, 0));
    act(() => result.current[1](5));
    expect(result.current[0]).toBe(5);
  });

  it('returns controlled value', () => {
    const { result } = renderHook(() => useControllableState('controlled', 'default'));
    expect(result.current[0]).toBe('controlled');
  });

  it('calls onChange for controlled', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState('controlled', 'default', onChange));
    act(() => result.current[1]('new'));
    expect(onChange).toHaveBeenCalledWith('new');
  });

  it('supports updater function', () => {
    const { result } = renderHook(() => useControllableState(undefined, 0));
    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(1);
  });
});
