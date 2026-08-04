import { useRef, useState } from 'react';
import type { Ref } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

export interface SearchInputProps {
  ref?: Ref<View>;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function SearchInput(
  {
    ref,
    value,
    defaultValue = '',
    placeholder = 'Search…',
    onChange,
    onClear,
    disabled = false,
    style,
  }: SearchInputProps,
) {
  const theme = useTheme();
  const [val, setVal] = useControllableState(value, defaultValue, onChange);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      setVal('');
    }
    inputRef.current?.focus();
  };

  const shellStyle: ViewStyle = {
    height: theme.controlHeight.md,
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.controlPadding.field,
    gap: 8,
    borderWidth: 1,
    borderColor: focused
      ? theme.semantic.border.focus
      : theme.semantic.border.default,
    backgroundColor: theme.semantic.surface.card,
    ...(focused ? theme.focusRing.primary : {}),
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const iconStyle: TextStyle = {
    fontSize: 14,
    color: theme.semantic.icon.muted,
  };

  const inputStyle: TextStyle = {
    flex: 1,
    padding: 0,
    backgroundColor: 'transparent',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    color: theme.semantic.text.primary,
  };

  const clearStyle: TextStyle = {
    fontSize: 14,
    fontWeight: theme.fontWeight.medium,
    color: theme.semantic.icon.muted,
  };

  return (
    <View ref={ref} style={shellStyle}>
      <Text style={iconStyle}>{'⌕'}</Text>
      <TextInput
        ref={inputRef}
        value={val}
        onChangeText={setVal}
        placeholder={placeholder}
        placeholderTextColor={theme.semantic.text.muted}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={!disabled}
        style={inputStyle}
        accessibilityRole="search"
      />
      {val.length > 0 && (
        <Pressable
          onPress={handleClear}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Text style={clearStyle}>{'✕'}</Text>
        </Pressable>
      )}
    </View>
  );
}
