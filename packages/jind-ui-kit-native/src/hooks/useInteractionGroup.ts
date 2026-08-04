import { createContext, useContext, useState, useMemo } from 'react';

export interface InteractionState {
  pressed: boolean;
  focused: boolean;
}

export const InteractionGroupContext = createContext<InteractionState | null>(null);

export function useGroupState(): InteractionState {
  return useContext(InteractionGroupContext) ?? { pressed: false, focused: false };
}

export function useInteractionGroup() {
  const [state, setState] = useState<InteractionState>({ pressed: false, focused: false });

  const handlers = useMemo(() => ({
    onPressIn: () => setState(s => ({ ...s, pressed: true })),
    onPressOut: () => setState(s => ({ ...s, pressed: false })),
    onFocus: () => setState(s => ({ ...s, focused: true })),
    onBlur: () => setState(s => ({ ...s, focused: false })),
  }), []);

  return { state, handlers, Provider: InteractionGroupContext.Provider };
}
