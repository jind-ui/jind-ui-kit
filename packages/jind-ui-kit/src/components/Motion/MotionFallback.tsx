import { createElement } from 'react';
import type { MotionProps } from './Motion';

let _warned = false;

export function Motion({ show, children, as = 'div' }: MotionProps) {
  if (!_warned) {
    _warned = true;
    console.warn(
      '[jind-ui-kit] <Motion> requires the "motion" package for animations.\n' +
        'Install it: npm install motion\n' +
        'Then import from "jind-ui-kit/motion" instead of "jind-ui-kit".',
    );
  }
  if (!show) return null;
  return createElement(as, undefined, children);
}
