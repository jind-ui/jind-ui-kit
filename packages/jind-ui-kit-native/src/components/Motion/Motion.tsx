import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from 'react';
import {
  AccessibilityInfo,
  Animated,
  View,
  type ViewStyle,
} from 'react-native';

export type MotionPreset =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'scale-fade'
  | 'blur'
  | 'blur-fade'
  | 'rotate'
  | 'bounce'
  | 'flip'
  | 'zoom'
  | 'collapse'
  | 'pop';

/** Presets that are not natively supported in RN and fall back to simpler alternatives. */
const PRESET_FALLBACKS: Partial<Record<MotionPreset, MotionPreset>> = {
  blur: 'fade',
  'blur-fade': 'fade',
  collapse: 'fade',
  rotate: 'scale',
  flip: 'scale',
};

interface PresetConfig {
  /** Which animated values this preset drives (besides opacity which is always driven). */
  values: ('translateY' | 'translateX' | 'scale')[];
  /** The "hidden" value for each key in `values` (shown state is always 0 for translates, 1 for scale). */
  from: Record<string, number>;
  /** Whether to use spring physics instead of timing. */
  spring?: {
    stiffness: number;
    damping: number;
  };
}

const PRESET_CONFIGS: Record<string, PresetConfig> = {
  fade: {
    values: [],
    from: {},
  },
  'slide-up': {
    values: ['translateY'],
    from: { translateY: 20 },
  },
  'slide-down': {
    values: ['translateY'],
    from: { translateY: -20 },
  },
  'slide-left': {
    values: ['translateX'],
    from: { translateX: 20 },
  },
  'slide-right': {
    values: ['translateX'],
    from: { translateX: -20 },
  },
  scale: {
    values: ['scale'],
    from: { scale: 0.9 },
  },
  'scale-fade': {
    values: ['scale', 'translateY'],
    from: { scale: 0.95, translateY: 8 },
  },
  bounce: {
    values: ['translateY'],
    from: { translateY: -20 },
    spring: { stiffness: 400, damping: 15 },
  },
  zoom: {
    values: ['scale'],
    from: { scale: 0 },
    spring: { stiffness: 300, damping: 20 },
  },
  pop: {
    values: ['scale'],
    from: { scale: 0.6 },
    spring: { stiffness: 500, damping: 18 },
  },
};

export interface MotionProps {
  show: boolean;
  preset?: MotionPreset;
  /** Duration in seconds (matching the web API). Converted to ms internally. Default 0.2. */
  duration?: number;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  children: ReactNode;
  style?: ViewStyle;
  ref?: Ref<View>;
  onAnimationComplete?: () => void;
}

function resolvePreset(preset: MotionPreset): string {
  return PRESET_FALLBACKS[preset] ?? preset;
}

export function Motion({
  show,
  preset = 'fade',
  duration = 0.2,
  delay,
  children,
  style,
  ref,
  onAnimationComplete,
}: MotionProps) {
  const resolved = resolvePreset(preset);
  const config = PRESET_CONFIGS[resolved] ?? PRESET_CONFIGS.fade;

  // Animated progress: 0 = hidden, 1 = visible
  const progress = useRef(new Animated.Value(show ? 1 : 0)).current;

  // Track mount state: children are rendered while visible OR while the exit animation is running
  const [mounted, setMounted] = useState(show);

  // Reduced motion preference
  const reducedMotion = useRef(false);
  useEffect(() => {
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled: boolean) => {
        reducedMotion.current = enabled;
      },
    );
    // Check initial value
    AccessibilityInfo.isReduceMotionEnabled().then((enabled: boolean) => {
      reducedMotion.current = enabled;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const animate = useCallback(
    (toValue: number, cb?: () => void) => {
      const durationMs = reducedMotion.current ? 0 : duration * 1000;
      const delayMs =
        delay != null && !reducedMotion.current ? delay * 1000 : 0;

      if (config.spring && !reducedMotion.current) {
        // Spring presets ignore explicit duration
        const animation = Animated.spring(progress, {
          toValue,
          stiffness: config.spring.stiffness,
          damping: config.spring.damping,
          useNativeDriver: true,
          delay: delayMs,
        });
        animation.start(({ finished }) => {
          if (finished) cb?.();
        });
      } else {
        const animation = Animated.timing(progress, {
          toValue,
          duration: durationMs,
          delay: delayMs,
          useNativeDriver: true,
          easing: undefined, // default ease-in-out
        });
        animation.start(({ finished }) => {
          if (finished) cb?.();
        });
      }
    },
    [progress, config.spring, duration, delay],
  );

  useEffect(() => {
    if (show) {
      // Mount first, then animate in
      setMounted(true);
      // Reset to hidden state before animating in
      progress.setValue(0);
      animate(1, onAnimationComplete);
    } else {
      // Animate out, then unmount
      animate(0, () => {
        setMounted(false);
        onAnimationComplete?.();
      });
    }
    // onAnimationComplete is intentionally excluded to avoid re-triggering on callback identity change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, animate, progress]);

  if (!mounted) return null;

  // Build transform array from animated progress value.
  // Constructed as a plain array then cast, because RN's animated transform
  // type is readonly and does not allow Array.push.
  const transform = config.values.map((key) => {
    if (key === 'translateY') {
      return {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [config.from.translateY, 0],
        }),
      };
    }
    if (key === 'translateX') {
      return {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [config.from.translateX, 0],
        }),
      };
    }
    // key === 'scale'
    return {
      scale: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [config.from.scale, 1],
      }),
    };
  });

  const animatedStyle = {
    opacity: progress,
    ...(transform.length > 0 ? { transform } : {}),
    ...style,
  };

  return (
    <Animated.View ref={ref} style={animatedStyle}>
      {children}
    </Animated.View>
  );
}
