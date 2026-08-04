import {
  useState,
  useRef,
  useCallback,
  useEffect,
  Children,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles } from '../../utils/styles';

export interface CarouselProps {
  children: ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  slidesToShow?: number;
  gap?: number;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

export function Carousel({
  children,
  autoPlay = false,
  interval = 4000,
  showDots = true,
  showArrows = true,
  loop = false,
  slidesToShow = 1,
  gap = 16,
  style,
  ref,
}: CarouselProps) {
  const theme = useTheme();
  const items = Children.toArray(children);
  const total = items.length;
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const maxIndex = Math.max(0, total - slidesToShow);

  const goTo = useCallback(
    (index: number) => {
      if (loop) {
        setCurrent(((index % total) + total) % total);
      } else {
        setCurrent(Math.max(0, Math.min(index, maxIndex)));
      }
    },
    [loop, total, maxIndex],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(next, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, interval, next]);

  const canPrev = loop || current > 0;
  const canNext = loop || current < maxIndex;

  const transitionValue = transition('background-color', 'opacity');

  const containerStyle: CSSProperties = mergeStyles(
    {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
    },
    style,
  );

  const trackStyle: CSSProperties = {
    display: 'flex',
    gap,
    transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: `translateX(calc(-${current} * (100% / ${slidesToShow} + ${gap}px)))`,
  };

  const slideStyle: CSSProperties = {
    flex: `0 0 calc((100% - ${gap * (slidesToShow - 1)}px) / ${slidesToShow})`,
    minWidth: 0,
  };

  const arrowBase: CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: `1px solid ${theme.semantic.border.subtle}`,
    backgroundColor: theme.semantic.surface.card,
    boxShadow: theme.shadow.sm,
    cursor: 'pointer',
    fontSize: 18,
    color: theme.semantic.text.primary,
    transition: transitionValue,
    outline: 'none',
    padding: 0,
  };

  const dotsStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  };

  return (
    <div ref={ref} aria-roledescription="carousel" aria-label="Carousel" style={containerStyle}>
      <div ref={trackRef} style={trackStyle}>
        {items.map((child, i) => (
          <div key={i} style={slideStyle} aria-roledescription="slide" aria-label={`Slide ${i + 1} of ${total}`}>
            {child}
          </div>
        ))}
      </div>

      {showArrows && total > slidesToShow && (
        <>
          <button
            type="button"
            style={{
              ...arrowBase,
              left: 8,
              opacity: canPrev ? 1 : 0.3,
              pointerEvents: canPrev ? 'auto' : 'none',
            }}
            onClick={prev}
            aria-label="Previous slide"
            disabled={!canPrev}
          >
            {'←'}
          </button>
          <button
            type="button"
            style={{
              ...arrowBase,
              right: 8,
              opacity: canNext ? 1 : 0.3,
              pointerEvents: canNext ? 'auto' : 'none',
            }}
            onClick={next}
            aria-label="Next slide"
            disabled={!canNext}
          >
            {'→'}
          </button>
        </>
      )}

      {showDots && total > slidesToShow && (
        <div style={dotsStyle} role="tablist" aria-label="Slides">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                backgroundColor: i === current
                  ? theme.semantic.fill.primary
                  : theme.semantic.border.default,
                transition: 'width 200ms ease, background-color 200ms ease',
                outline: 'none',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
