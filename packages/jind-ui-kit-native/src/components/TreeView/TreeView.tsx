import { memo, useCallback, type Ref } from 'react';
import { Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeViewProps {
  ref?: Ref<View>;
  nodes: TreeNode[];
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandChange?: (expanded: string[]) => void;
  selected?: string | null;
  onSelect?: (id: string) => void;
  indentSize?: number;
  style?: ViewStyle;
}

function TreeViewInner({
  ref,
  nodes,
  expanded,
  defaultExpanded,
  onExpandChange,
  selected,
  onSelect,
  indentSize = 20,
  style,
}: TreeViewProps) {
  const theme = useTheme();

  const [expandedIds, setExpandedIds] = useControllableState<string[]>(
    expanded,
    defaultExpanded ?? [],
    onExpandChange,
  );

  const toggleExpand = useCallback(
    (id: string) => {
      setExpandedIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((v) => v !== id);
        }
        return [...prev, id];
      });
    },
    [setExpandedIds],
  );

  const handleSelect = useCallback(
    (id: string) => {
      onSelect?.(id);
    },
    [onSelect],
  );

  const chevronStyle = (isExpanded: boolean): TextStyle => ({
    fontSize: theme.fontSize[12],
    color: theme.semantic.text.muted,
    width: 16,
    textAlign: 'center',
    transform: [{ rotate: isExpanded ? '90deg' : '0deg' }],
  });

  const labelStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    color: theme.semantic.text.primary,
    flex: 1,
  };

  const renderNode = (node: TreeNode, depth: number) => {
    const hasChildren = node.children != null && node.children.length > 0;
    const isExpanded = expandedIds.includes(node.id);
    const isSelected = selected === node.id;

    const rowStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.space[2],
      paddingHorizontal: theme.space[4],
      paddingLeft: theme.space[4] + depth * indentSize,
      backgroundColor: isSelected
        ? theme.semantic.surface.selected
        : 'transparent',
      borderRadius: theme.radius.sm,
      opacity: node.disabled ? 0.5 : 1,
    };

    return (
      <View key={node.id}>
        <Pressable
          onPress={() => {
            if (node.disabled) return;
            if (hasChildren) {
              toggleExpand(node.id);
            }
            handleSelect(node.id);
          }}
          disabled={node.disabled}
          style={({ pressed }) => ({
            ...rowStyle,
            backgroundColor: pressed
              ? theme.semantic.surface.pressed
              : isSelected
                ? theme.semantic.surface.selected
                : 'transparent',
          })}
          accessibilityRole="button"
          accessibilityLabel={node.label}
          accessibilityState={{
            disabled: node.disabled,
            expanded: hasChildren ? isExpanded : undefined,
            selected: isSelected,
          }}
        >
          {hasChildren ? (
            <Text style={chevronStyle(isExpanded)}>
              {'▸'}
            </Text>
          ) : (
            <View style={{ width: 16 }} />
          )}

          {node.icon != null && (
            <Text
              style={{
                fontSize: theme.fontSize[14],
                marginHorizontal: theme.space[2],
                color: theme.semantic.text.secondary,
              }}
            >
              {node.icon}
            </Text>
          )}

          <Text
            style={{
              ...labelStyle,
              marginLeft: node.icon != null ? 0 : theme.space[2],
            }}
            numberOfLines={1}
          >
            {node.label}
          </Text>
        </Pressable>

        {hasChildren && isExpanded && (
          <View>
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View ref={ref} style={style} accessibilityRole="list">
      {nodes.map((node) => renderNode(node, 0))}
    </View>
  );
}

TreeViewInner.displayName = 'TreeView';
export const TreeView = memo(TreeViewInner);
