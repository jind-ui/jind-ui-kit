import { type ReactNode, type ElementType } from 'react';
import { AnimatePresence, motion, type TargetAndTransition, type Transition } from 'motion/react';

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

interface PresetConfig {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  transition?: Partial<Transition>;
}

const presetVariants: Record<MotionPreset, PresetConfig> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'slide-up': {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 12 },
  },
  'slide-down': {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  },
  'slide-left': {
    initial: { opacity: 0, x: 12 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 12 },
  },
  'slide-right': {
    initial: { opacity: 0, x: -12 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -12 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  'scale-fade': {
    initial: { opacity: 0, scale: 0.95, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 8 },
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(8px)' },
  },
  'blur-fade': {
    initial: { opacity: 0, filter: 'blur(4px)', y: 6 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
    exit: { opacity: 0, filter: 'blur(4px)', y: 6 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -8, scale: 0.95 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 8, scale: 0.95 },
  },
  bounce: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
  flip: {
    initial: { opacity: 0, rotateX: 90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: -90 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  collapse: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
  },
  pop: {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.6 },
    transition: { type: 'spring', stiffness: 500, damping: 18 },
  },
};

export interface MotionProps {
  show: boolean;
  preset?: MotionPreset;
  duration?: number;
  delay?: number;
  children: ReactNode;
  as?: ElementType;
  style?: React.CSSProperties;
  layout?: boolean;
  onAnimationComplete?: () => void;
}

function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mq.matches;
}

export function Motion({
  show,
  preset = 'fade',
  duration = 0.2,
  delay,
  children,
  as = 'div',
  style,
  layout = false,
  onAnimationComplete,
}: MotionProps) {
  const reducedMotion = usePrefersReducedMotion();
  const v = presetVariants[preset];
  const Component = motion.create(as);

  const baseTransition: Transition = {
    duration: reducedMotion ? 0 : duration,
    ease: [0.4, 0, 0.2, 1],
    ...v.transition,
    ...(delay != null && !reducedMotion ? { delay } : {}),
  };

  return (
    <AnimatePresence>
      {show && (
        <Component
          initial={v.initial}
          animate={v.animate}
          exit={v.exit}
          transition={baseTransition}
          style={{
            ...(preset === 'collapse' ? { overflow: 'hidden' } : {}),
            ...style,
          }}
          layout={layout}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </Component>
      )}
    </AnimatePresence>
  );
}

export { motion, AnimatePresence } from 'motion/react';
