import { useState } from 'react';
import type { Ref } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

type SelectOption = string | { label: string; value: string; swatch?: string };

export interface SelectProps {
  ref?: Ref<View>;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  onChange?: (value: string) => void;
  style?: ViewStyle;
}

function getLabel(opt: SelectOption): string {
  return typeof opt === 'string' ? opt : opt.label;
}

function getValue(opt: SelectOption): string {
  return typeof opt === 'string' ? opt : opt.value;
}

function getSwatch(opt: SelectOption): string | undefined {
  return typeof opt === 'string' ? undefined : opt.swatch;
}

export function Select(
  {
    ref,
    value,
    defaultValue = '',
    placeholder = 'Select…',
    options,
    disabled = false,
    onChange,
    style,
  }: SelectProps,
) {
  const theme = useTheme();
  const [val, setVal] = useControllableState(value, defaultValue, onChange);
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => getValue(o) === val);
  const displayLabel = selectedOption ? getLabel(selectedOption) : undefined;

  const handleOpen = () => {
    if (disabled) return;
    setOpen(true);
  };

  const handleSelect = (optionValue: string) => {
    setVal(optionValue);
    setOpen(false);
  };

  const triggerStyle: ViewStyle = {
    height: theme.controlHeight.md,
    paddingHorizontal: theme.controlPadding.field,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: open
      ? theme.semantic.surface.card
      : theme.semantic.surface.subtle,
    borderWidth: open ? 2 : 1,
    borderColor: open
      ? theme.semantic.border.focus
      : theme.semantic.border.subtle,
    ...(open ? theme.focusRing.primary : theme.shadow.xs),
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const labelStyle: TextStyle = {
    flex: 1,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.fontSize[14] * 1.4,
    color: displayLabel
      ? theme.semantic.text.primary
      : theme.semantic.text.muted,
  };

  const chevronStyle: TextStyle = {
    fontSize: 10,
    color: theme.semantic.icon.muted,
    transform: open ? [{ rotate: '180deg' }] : [],
  };

  const backdropStyle: ViewStyle = {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const contentStyle: ViewStyle = {
    maxHeight: '60%',
    width: '90%',
    borderRadius: theme.radius.md,
    backgroundColor: theme.semantic.surface.card,
    ...theme.shadow.menu,
  };

  return (
    <>
      <Pressable
        ref={ref}
        onPress={handleOpen}
        accessibilityRole="button"
        accessibilityState={{ disabled, expanded: open }}
        disabled={disabled}
        style={triggerStyle}
      >
        <Text style={labelStyle} numberOfLines={1}>
          {displayLabel ?? placeholder}
        </Text>
        <Text style={chevronStyle}>{'▼'}</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Pressable style={backdropStyle} onPress={() => setOpen(false)}>
            <Pressable style={contentStyle} onPress={() => {}}>
              <FlatList
                data={options}
                keyExtractor={(item) => getValue(item)}
                renderItem={({ item }) => {
                  const optValue = getValue(item);
                  const optLabel = getLabel(item);
                  const swatch = getSwatch(item);
                  const isSelected = optValue === val;

                  const itemStyle: ViewStyle = {
                    height: 44,
                    paddingHorizontal: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  };

                  const itemLabelStyle: TextStyle = {
                    flex: 1,
                    fontFamily: theme.fontFamily.sans,
                    fontSize: theme.fontSize[14],
                    fontWeight: theme.fontWeight.regular,
                    lineHeight: theme.fontSize[14] * 1.4,
                    color: theme.semantic.text.primary,
                  };

                  const swatchStyle: ViewStyle = {
                    width: 14,
                    height: 14,
                    borderRadius: theme.radius.full,
                    backgroundColor: swatch,
                  };

                  const checkStyle: TextStyle = {
                    fontSize: 14,
                    fontWeight: theme.fontWeight.medium,
                    color: theme.semantic.fill.primary,
                  };

                  return (
                    <Pressable
                      onPress={() => handleSelect(optValue)}
                      accessibilityRole="menuitem"
                      accessibilityState={{ selected: isSelected }}
                      style={({ pressed }) => [
                        itemStyle,
                        pressed && {
                          backgroundColor: theme.semantic.surface.hover,
                        },
                      ]}
                    >
                      {swatch != null && <View style={swatchStyle} />}
                      <Text style={itemLabelStyle}>{optLabel}</Text>
                      {isSelected && <Text style={checkStyle}>{'✓'}</Text>}
                    </Pressable>
                  );
                }}
              />
            </Pressable>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </>
  );
}
