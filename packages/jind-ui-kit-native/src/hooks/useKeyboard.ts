import { useState, useEffect } from 'react';
import { Keyboard, type KeyboardEvent } from 'react-native';

export interface KeyboardState {
  visible: boolean;
  height: number;
}

export function useKeyboard(): KeyboardState {
  const [state, setState] = useState<KeyboardState>({ visible: false, height: 0 });

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e: KeyboardEvent) => {
      setState({ visible: true, height: e.endCoordinates.height });
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setState({ visible: false, height: 0 });
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return state;
}
