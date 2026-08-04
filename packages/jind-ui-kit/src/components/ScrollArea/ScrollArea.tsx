import {
  useRef,
  useState,
  useEffect,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface ScrollAreaProps {
  children: ReactNode;
  maxHeight?: number | string;
  orientation?: 'vertical' | 'horizontal' | 'both';
  scrollbarSize?: number;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

let styleInjected = false;

function injectScrollbarStyles(): void {
  if (styleInjected || typeof document === 'undefined') return;
  styleInjected = true;

  const style = document.createElement('style');
  style.setAttribute('data-jind-scrollarea', '');
  style.textContent = `
    .jind-scroll-area::-webkit-scrollbar {
      width: var(--jind-scrollbar-size);
      height: var(--jind-scrollbar-size);
    }
    .jind-scroll-area::-webkit-scrollbar-track {
      background: var(--jind-scrollbar-track);
      border-radius: 999px;
    }
    .jind-scroll-area::-webkit-scrollbar-thumb {
      background: var(--jind-scrollbar-thumb);
      border-radius: 999px;
      opacity: 0;
      transition: background 120ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .jind-scroll-area::-webkit-scrollbar-thumb:hover {
      background: var(--jind-scrollbar-thumb-hover);
    }
    .jind-scroll-area::-webkit-scrollbar-corner {
      background: transparent;
    }
    .jind-scroll-area {
      scrollbar-width: thin;
      scrollbar-color: transparent transparent;
    }
    .jind-scroll-area.jind-scroll-area--hovered {
      scrollbar-color: var(--jind-scrollbar-thumb) var(--jind-scrollbar-track);
    }
    .jind-scroll-area:not(.jind-scroll-area--hovered)::-webkit-scrollbar-thumb {
      background: transparent;
    }
  `;
  document.head.appendChild(style);
}

export function ScrollArea({
  children,
  maxHeight,
  orientation = 'vertical',
  scrollbarSize = 8,
  style,
  ref,
}: ScrollAreaProps) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectScrollbarStyles();
  }, []);

  const overflowX =
    orientation === 'horizontal' || orientation === 'both' ? 'auto' : 'hidden';
  const overflowY =
    orientation === 'vertical' || orientation === 'both' ? 'auto' : 'hidden';

  const cssVars: Record<string, string> = {
    '--jind-scrollbar-size': `${scrollbarSize}px`,
    '--jind-scrollbar-track': theme.semantic.surface.subtle,
    '--jind-scrollbar-thumb': theme.colors.gray[300],
    '--jind-scrollbar-thumb-hover': theme.colors.gray[400],
  };

  const contentStyle: CSSProperties = {
    overflowX,
    overflowY,
    maxHeight,
    ...cssVars as unknown as CSSProperties,
    ...style,
  };

  const className = `jind-scroll-area${hovered ? ' jind-scroll-area--hovered' : ''}`;

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref && typeof ref === 'object') {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className={className}
      style={contentStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}
