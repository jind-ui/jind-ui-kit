import { useState, useEffect } from 'react';
import { Dimensions, type ScaledSize } from 'react-native';

export interface WindowDimensions {
  width: number;
  height: number;
}

export function useDimensions(): WindowDimensions {
  const [dimensions, setDimensions] = useState<WindowDimensions>(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }: { window: ScaledSize }) => {
        setDimensions({ width: window.width, height: window.height });
      },
    );
    return () => subscription.remove();
  }, []);

  return dimensions;
}
