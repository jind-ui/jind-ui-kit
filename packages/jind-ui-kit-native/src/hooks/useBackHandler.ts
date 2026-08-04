import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useBackHandler(handler: () => boolean, enabled = true): void {
  useEffect(() => {
    if (!enabled) return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => subscription.remove();
  }, [handler, enabled]);
}
