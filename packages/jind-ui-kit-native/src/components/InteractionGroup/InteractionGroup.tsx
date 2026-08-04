import { type ReactNode, type Ref } from 'react';
import { Pressable, View, type ViewStyle, type PressableProps } from 'react-native';
import { useInteractionGroup } from '../../hooks/useInteractionGroup';

export interface InteractionGroupProps extends Omit<PressableProps, 'children' | 'style'> {
  ref?: Ref<View>;
  children: ReactNode | ((state: { pressed: boolean; focused: boolean }) => ReactNode);
  style?: ViewStyle;
}

export function InteractionGroup({ ref, children, style, onPressIn, onPressOut, onFocus, onBlur, ...rest }: InteractionGroupProps) {
  const { state, handlers, Provider } = useInteractionGroup();

  return (
    <Provider value={state}>
      <Pressable
        ref={ref}
        style={style}
        onPressIn={(e) => { handlers.onPressIn(); onPressIn?.(e); }}
        onPressOut={(e) => { handlers.onPressOut(); onPressOut?.(e); }}
        onFocus={(e) => { handlers.onFocus(); onFocus?.(e); }}
        onBlur={(e) => { handlers.onBlur(); onBlur?.(e); }}
        {...rest}
      >
        {typeof children === 'function' ? children(state) : children}
      </Pressable>
    </Provider>
  );
}
