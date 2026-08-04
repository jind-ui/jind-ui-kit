import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useDisclosure } from './useDisclosure';

describe('useDisclosure', () => {
  it('starts closed by default', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('starts open when initialOpen is true', () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('opens', () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => result.current.onOpen());
    expect(result.current.isOpen).toBe(true);
  });

  it('closes', () => {
    const { result } = renderHook(() => useDisclosure(true));
    act(() => result.current.onClose());
    expect(result.current.isOpen).toBe(false);
  });

  it('toggles', () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => result.current.onToggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.onToggle());
    expect(result.current.isOpen).toBe(false);
  });
});
