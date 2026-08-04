import { memo, useCallback, useMemo, useState, type Ref } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface CommandItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  group?: string;
  onSelect: () => void;
  disabled?: boolean;
}

export interface CommandMenuProps {
  ref?: Ref<View>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
  style?: ViewStyle;
}

interface GroupedSection {
  group: string;
  items: CommandItem[];
}

function CommandMenuInner({
  ref,
  open,
  onOpenChange,
  items,
  placeholder = 'Search...',
  emptyMessage = 'No results found.',
  style,
}: CommandMenuProps) {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lowerQuery) ||
        (item.description != null && item.description.toLowerCase().includes(lowerQuery)),
    );
  }, [items, query]);

  const sections = useMemo(() => {
    const grouped = new Map<string, CommandItem[]>();
    for (const item of filteredItems) {
      const group = item.group ?? '';
      const existing = grouped.get(group);
      if (existing) {
        existing.push(item);
      } else {
        grouped.set(group, [item]);
      }
    }
    const result: Array<GroupedSection | CommandItem> = [];
    for (const [group, groupItems] of grouped) {
      if (group !== '') {
        result.push({ group, items: groupItems });
      } else {
        for (const item of groupItems) {
          result.push(item);
        }
      }
    }
    return result;
  }, [filteredItems]);

  const flatData = useMemo(() => {
    const list: Array<{ type: 'header'; group: string } | { type: 'item'; item: CommandItem }> = [];
    for (const section of sections) {
      if ('group' in section && 'items' in section) {
        list.push({ type: 'header', group: section.group });
        for (const item of section.items) {
          list.push({ type: 'item', item });
        }
      } else {
        list.push({ type: 'item', item: section as CommandItem });
      }
    }
    return list;
  }, [sections]);

  const handleSelect = useCallback(
    (item: CommandItem) => {
      if (item.disabled) return;
      item.onSelect();
      setQuery('');
      onOpenChange(false);
    },
    [onOpenChange],
  );

  const handleClose = useCallback(() => {
    setQuery('');
    onOpenChange(false);
  }, [onOpenChange]);

  const overlayStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.space[7],
  };

  const panelStyle: ViewStyle = {
    width: '100%',
    maxWidth: 480,
    maxHeight: '70%',
    backgroundColor: theme.semantic.surface.card,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    ...theme.shadow.menu,
    ...style,
  };

  const inputContainerStyle: ViewStyle = {
    borderBottomWidth: theme.borderWidth.default,
    borderBottomColor: theme.semantic.border.subtle,
    paddingHorizontal: theme.space[7],
    paddingVertical: theme.space[4],
  };

  const inputStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[16],
    color: theme.semantic.text.primary,
    padding: 0,
  };

  const groupHeaderStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    fontWeight: theme.fontWeight.medium,
    color: theme.semantic.text.muted,
    paddingHorizontal: theme.space[7],
    paddingTop: theme.space[4],
    paddingBottom: theme.space[2],
    textTransform: 'uppercase',
    letterSpacing: theme.letterSpacing.normal,
  };

  const itemLabelStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    color: theme.semantic.text.primary,
  };

  const itemDescStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: theme.semantic.text.muted,
    marginTop: theme.space[1],
  };

  const emptyStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    color: theme.semantic.text.muted,
    textAlign: 'center',
    paddingVertical: theme.space[10],
    paddingHorizontal: theme.space[7],
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <Pressable style={overlayStyle} onPress={handleClose}>
        <Pressable style={panelStyle} onPress={() => {}}>
          <View ref={ref} style={inputContainerStyle}>
            <TextInput
              style={inputStyle}
              value={query}
              onChangeText={setQuery}
              placeholder={placeholder}
              placeholderTextColor={theme.semantic.text.muted}
              autoFocus
              returnKeyType="done"
              accessibilityLabel="Search commands"
            />
          </View>

          {flatData.length === 0 ? (
            <Text style={emptyStyle}>{emptyMessage}</Text>
          ) : (
            <FlatList
              data={flatData}
              keyExtractor={(row) =>
                row.type === 'header' ? `header-${row.group}` : row.item.id
              }
              keyboardShouldPersistTaps="handled"
              renderItem={({ item: row }) => {
                if (row.type === 'header') {
                  return <Text style={groupHeaderStyle}>{row.group}</Text>;
                }
                const { item } = row;
                return (
                  <Pressable
                    onPress={() => handleSelect(item)}
                    disabled={item.disabled}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: theme.space[3],
                      paddingHorizontal: theme.space[7],
                      backgroundColor: pressed
                        ? theme.semantic.surface.pressed
                        : 'transparent',
                      opacity: item.disabled ? 0.5 : 1,
                    })}
                    accessibilityRole="button"
                    accessibilityLabel={item.label}
                    accessibilityState={{ disabled: item.disabled }}
                  >
                    {item.icon != null && (
                      <Text
                        style={{
                          fontSize: theme.fontSize[16],
                          marginRight: theme.space[4],
                          color: theme.semantic.text.secondary,
                        }}
                      >
                        {item.icon}
                      </Text>
                    )}
                    <View style={{ flex: 1 }}>
                      <Text style={itemLabelStyle}>{item.label}</Text>
                      {item.description != null && (
                        <Text style={itemDescStyle}>{item.description}</Text>
                      )}
                    </View>
                  </Pressable>
                );
              }}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

CommandMenuInner.displayName = 'CommandMenu';
export const CommandMenu = memo(CommandMenuInner);
