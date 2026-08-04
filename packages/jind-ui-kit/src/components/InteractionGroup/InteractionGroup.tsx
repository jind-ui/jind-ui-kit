import { type CSSProperties, type ReactNode, type Ref } from 'react';
import { useInteractionGroup } from '../../hooks/useInteractionGroup';

export interface InteractionGroupProps {
  ref?: Ref<HTMLDivElement>;
  as?: 'div' | 'button' | 'a';
  children: ReactNode | ((state: { pressed: boolean; hovered: boolean; focused: boolean }) => ReactNode);
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function InteractionGroup({
  ref,
  as: Tag = 'div',
  children,
  style,
  className,
  disabled,
  onClick,
}: InteractionGroupProps) {
  const { state, handlers, Provider } = useInteractionGroup();

  return (
    <Provider value={state}>
      <Tag
        ref={ref as Ref<HTMLDivElement> & Ref<HTMLButtonElement> & Ref<HTMLAnchorElement>}
        style={style}
        className={className}
        onClick={disabled ? undefined : onClick}
        onMouseDown={disabled ? undefined : handlers.onMouseDown}
        onMouseUp={disabled ? undefined : handlers.onMouseUp}
        onMouseEnter={disabled ? undefined : handlers.onMouseEnter}
        onMouseLeave={disabled ? undefined : handlers.onMouseLeave}
        onFocus={disabled ? undefined : handlers.onFocus}
        onBlur={disabled ? undefined : handlers.onBlur}
      >
        {typeof children === 'function' ? children(state) : children}
      </Tag>
    </Provider>
  );
}
