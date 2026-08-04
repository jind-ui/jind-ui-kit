import { createContext, useContext, useState, useMemo } from 'react';

export interface InteractionState {
  pressed: boolean;
  hovered: boolean;
  focused: boolean;
}

export const InteractionGroupContext = createContext<InteractionState | null>(null);

export function useGroupState(): InteractionState {
  return useContext(InteractionGroupContext) ?? { pressed: false, hovered: false, focused: false };
}

export function useInteractionGroup() {
  const [state, setState] = useState<InteractionState>({ pressed: false, hovered: false, focused: false });

  const handlers = useMemo(() => ({
    onMouseDown: () => setState(s => ({ ...s, pressed: true })),
    onMouseUp: () => setState(s => ({ ...s, pressed: false })),
    onMouseEnter: () => setState(s => ({ ...s, hovered: true })),
    onMouseLeave: () => setState(s => ({ ...s, hovered: false, pressed: false })),
    onFocus: () => setState(s => ({ ...s, focused: true })),
    onBlur: () => setState(s => ({ ...s, focused: false })),
  }), []);

  return { state, handlers, Provider: InteractionGroupContext.Provider };
}
