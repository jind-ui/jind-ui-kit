import { useCallback, type Ref } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

function assignRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
  return useCallback(
    (node: T | null) => {
      refs.forEach((ref) => {
        if (node !== null) assignRef(ref, node);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}
