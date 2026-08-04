import {
  useState,
  useRef,
  useCallback,
  useEffect,
  Children,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition } from '../../utils/styles';

/* ─── ResizablePanel ─── */

export interface ResizablePanelProps {
  children: ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  id?: string;
}

export function ResizablePanel({ children }: ResizablePanelProps) {
  // Rendering is handled by the parent Resizable.
  // This component is used only for prop declaration.
  return children as React.ReactElement;
}

/* ─── ResizableHandle ─── */

export interface ResizableHandleProps {
  direction?: 'horizontal' | 'vertical';
  onMouseDown?: (e: React.MouseEvent) => void;
  style?: CSSProperties;
}

export function ResizableHandle({
  direction = 'horizontal',
  onMouseDown,
  style,
}: ResizableHandleProps) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  const isHorizontal = direction === 'horizontal';

  const handleStyle: CSSProperties = {
    position: 'relative',
    flexShrink: 0,
    width: isHorizontal ? 4 : '100%',
    height: isHorizontal ? '100%' : 4,
    background: hovered
      ? theme.semantic.fill.primary
      : theme.semantic.surface.subtle,
    cursor: isHorizontal ? 'col-resize' : 'row-resize',
    transition: transition('background-color'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    ...style,
  };

  const dotStyle: CSSProperties = {
    width: isHorizontal ? 2 : 8,
    height: isHorizontal ? 8 : 2,
    borderRadius: theme.radius.full,
    background: theme.semantic.border.default,
    pointerEvents: 'none',
  };

  return (
    <div
      style={handleStyle}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="separator"
      tabIndex={0}
      aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
      aria-label="Resize"
      aria-valuemin={0}
      aria-valuemax={100}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 10 : 1;
        if (
          (isHorizontal && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) ||
          (!isHorizontal && (e.key === 'ArrowUp' || e.key === 'ArrowDown'))
        ) {
          e.preventDefault();
        }
      }}
    >
      <div style={dotStyle} />
    </div>
  );
}

/* ─── Resizable ─── */

export interface ResizableProps {
  direction?: 'horizontal' | 'vertical';
  children: ReactNode;
  onResize?: (sizes: number[]) => void;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function Resizable({
  direction = 'horizontal',
  children,
  onResize,
  style,
  ref,
}: ResizableProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract ResizablePanel children
  const panelChildren = Children.toArray(children).filter(
    (child): child is React.ReactElement<ResizablePanelProps> =>
      child !== null &&
      typeof child === 'object' &&
      'type' in child &&
      (child as React.ReactElement).type === ResizablePanel,
  );

  const panelCount = panelChildren.length;

  // Initialize sizes from defaultSize props
  const [sizes, setSizes] = useState<number[]>(() => {
    const initial = panelChildren.map((child) => child.props.defaultSize ?? 0);
    const totalSpecified = initial.reduce((sum, s) => sum + s, 0);
    const unspecifiedCount = initial.filter((s) => s === 0).length;

    if (unspecifiedCount > 0 && totalSpecified < 100) {
      const remaining = (100 - totalSpecified) / unspecifiedCount;
      return initial.map((s) => (s === 0 ? remaining : s));
    }

    if (totalSpecified === 0) {
      const equal = 100 / panelCount;
      return initial.map(() => equal);
    }

    return initial;
  });

  const draggingIndex = useRef<number | null>(null);
  const startPos = useRef(0);
  const startSizes = useRef<number[]>([]);

  const handleMouseDown = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.preventDefault();
      draggingIndex.current = index;
      startPos.current =
        direction === 'horizontal' ? e.clientX : e.clientY;
      startSizes.current = [...sizes];
    },
    [direction, sizes],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggingIndex.current === null || !containerRef.current) return;

      const container = containerRef.current;
      const containerSize =
        direction === 'horizontal'
          ? container.getBoundingClientRect().width
          : container.getBoundingClientRect().height;

      const handleWidth = 4; // handle width in px
      const totalHandleSpace = handleWidth * (panelCount - 1);
      const availableSpace = containerSize - totalHandleSpace;

      const currentPos =
        direction === 'horizontal' ? e.clientX : e.clientY;
      const delta = currentPos - startPos.current;
      const deltaPercent = (delta / availableSpace) * 100;

      const idx = draggingIndex.current;
      const prev = startSizes.current;

      const panelA = panelChildren[idx];
      const panelB = panelChildren[idx + 1];

      const minA = panelA?.props.minSize ?? 10;
      const maxA = panelA?.props.maxSize ?? 90;
      const minB = panelB?.props.minSize ?? 10;
      const maxB = panelB?.props.maxSize ?? 90;

      let newSizeA = prev[idx] + deltaPercent;
      let newSizeB = prev[idx + 1] - deltaPercent;

      // Clamp
      if (newSizeA < minA) {
        newSizeA = minA;
        newSizeB = prev[idx] + prev[idx + 1] - minA;
      } else if (newSizeA > maxA) {
        newSizeA = maxA;
        newSizeB = prev[idx] + prev[idx + 1] - maxA;
      }

      if (newSizeB < minB) {
        newSizeB = minB;
        newSizeA = prev[idx] + prev[idx + 1] - minB;
      } else if (newSizeB > maxB) {
        newSizeB = maxB;
        newSizeA = prev[idx] + prev[idx + 1] - maxB;
      }

      const newSizes = [...prev];
      newSizes[idx] = newSizeA;
      newSizes[idx + 1] = newSizeB;

      setSizes(newSizes);
      onResize?.(newSizes);
    },
    [direction, panelCount, panelChildren, onResize],
  );

  const handleMouseUp = useCallback(() => {
    draggingIndex.current = null;
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const isHorizontal = direction === 'horizontal';

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    ...style,
  };

  const assignRef = (node: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
      node;
    if (typeof ref === 'function') ref(node);
    else if (ref && typeof ref === 'object') {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  return (
    <div ref={assignRef} style={containerStyle}>
      {panelChildren.map((panel, index) => {
        const panelStyle: CSSProperties = {
          flexBasis: `${sizes[index]}%`,
          flexGrow: 0,
          flexShrink: 0,
          overflow: 'hidden',
          minWidth: 0,
          minHeight: 0,
        };

        return (
          <div key={panel.props.id ?? index}>
            <div style={panelStyle}>{panel.props.children}</div>
            {index < panelCount - 1 && (
              <ResizableHandle
                direction={direction}
                onMouseDown={(e) => handleMouseDown(index, e)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
