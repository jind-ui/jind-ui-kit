import {
  Children,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface CarouselProps {
  ref?: Ref<View>;
  children: ReactNode;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  style?: ViewStyle;
}

function CarouselInner({
  ref,
  children,
  showDots = true,
  showArrows = true,
  loop = false,
  autoPlay = false,
  interval = 3000,
  style,
}: CarouselProps) {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const items = Children.toArray(children);
  const count = items.length;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (width === 0) return;
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / width);
      setActiveIndex(index);
    },
    [width],
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      if (width === 0 || count === 0) return;
      let target = index;
      if (loop) {
        target = ((index % count) + count) % count;
      } else {
        target = Math.max(0, Math.min(index, count - 1));
      }
      scrollRef.current?.scrollTo({ x: target * width, animated: true });
      setActiveIndex(target);
    },
    [width, count, loop],
  );

  const handlePrev = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const handleNext = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    if (autoPlay && count > 1) {
      autoPlayTimer.current = setInterval(() => {
        scrollToIndex(activeIndex + 1);
      }, interval);
      return () => {
        if (autoPlayTimer.current != null) {
          clearInterval(autoPlayTimer.current);
        }
      };
    }
    return undefined;
  }, [autoPlay, count, interval, activeIndex, scrollToIndex]);

  const containerStyle: ViewStyle = {
    ...style,
  };

  const arrowBase: ViewStyle = {
    position: 'absolute',
    top: '50%',
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: theme.radius.full,
    backgroundColor: theme.semantic.surface.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.sm,
    zIndex: 1,
  };

  const arrowTextStyle: TextStyle = {
    fontSize: theme.fontSize[18],
    color: theme.semantic.text.primary,
    fontWeight: theme.fontWeight.bold,
  };

  const dotsContainerStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.space[4],
    gap: theme.space[3],
  };

  const canGoPrev = loop || activeIndex > 0;
  const canGoNext = loop || activeIndex < count - 1;

  return (
    <View ref={ref} style={containerStyle} onLayout={handleLayout}>
      <View>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
        >
          {items.map((child, index) => (
            <View key={index} style={{ width }}>
              {child}
            </View>
          ))}
        </ScrollView>

        {showArrows && count > 1 && (
          <>
            {canGoPrev && (
              <Pressable
                onPress={handlePrev}
                style={{ ...arrowBase, left: theme.space[3] }}
                accessibilityRole="button"
                accessibilityLabel="Previous slide"
              >
                <Text style={arrowTextStyle}>{'←'}</Text>
              </Pressable>
            )}
            {canGoNext && (
              <Pressable
                onPress={handleNext}
                style={{ ...arrowBase, right: theme.space[3] }}
                accessibilityRole="button"
                accessibilityLabel="Next slide"
              >
                <Text style={arrowTextStyle}>{'→'}</Text>
              </Pressable>
            )}
          </>
        )}
      </View>

      {showDots && count > 1 && (
        <View style={dotsContainerStyle}>
          {items.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => scrollToIndex(index)}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${index + 1}`}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: theme.radius.full,
                  backgroundColor:
                    index === activeIndex
                      ? theme.semantic.fill.primary
                      : theme.semantic.border.subtle,
                }}
              />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

CarouselInner.displayName = 'Carousel';
export const Carousel = memo(CarouselInner);
