import { useState, useCallback, useRef } from 'react';

export function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (next: T | ((prev: T) => T)) => void] {
  const isControlled = controlledValue !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const value = isControlled ? controlledValue : internal;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue =
        typeof next === 'function'
          ? (next as (prev: T) => T)(value)
          : next;

      if (!isControlled) {
        setInternal(nextValue);
      }
      onChangeRef.current?.(nextValue);
    },
    [isControlled, value],
  );

  return [value, setValue];
}
