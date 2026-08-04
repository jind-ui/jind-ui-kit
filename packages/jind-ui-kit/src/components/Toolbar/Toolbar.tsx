import {
  createContext,
  useContext,
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactNode,
  type ReactElement,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';

/* ─── Context ─── */

interface ToolbarContextValue {
  activeValue: string | undefined;
  onChange: (value: string) => void;
}

const ToolbarContext = createContext<ToolbarContextValue | null>(null);

export function useToolbarContext() {
  return useContext(ToolbarContext);
}

/* ─── Toolbar ─── */

export interface ToolbarProps {
  value?: string;
  onChange?: (value: string) => void;
  'aria-label'?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function Toolbar({ value, onChange, 'aria-label': ariaLabel, children, style }: ToolbarProps) {
  const theme = useTheme();

  const toolbarStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: 0,
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    ...style,
  };

  const handleChange = (v: string) => {
    onChange?.(v);
  };

  return (
    <ToolbarContext.Provider value={{ activeValue: value, onChange: handleChange }}>
      <div role="toolbar" aria-label={ariaLabel} style={toolbarStyle}>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return child;
          // Inject active state based on toolbar value matching child's name prop
          const childProps = child.props as { name?: string };
          if (childProps.name !== undefined) {
            return cloneElement(child as ReactElement<any>, {
              active: value === childProps.name,
              onClick: (e: React.MouseEvent) => {
                handleChange(childProps.name!);
                // Also call original onClick if present
                const original = (child as ReactElement<any>).props.onClick;
                if (typeof original === 'function') original(e);
              },
            });
          }
          return child;
        })}
      </div>
    </ToolbarContext.Provider>
  );
}
