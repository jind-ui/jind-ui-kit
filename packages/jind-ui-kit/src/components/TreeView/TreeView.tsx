import {
  useState,
  useCallback,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles } from '../../utils/styles';

function TreeChevron({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeViewProps {
  nodes: TreeNode[];
  defaultExpanded?: string[];
  expanded?: string[];
  onExpandChange?: (ids: string[]) => void;
  selected?: string | null;
  onSelect?: (id: string) => void;
  expandIcon?: ReactNode;
  indentSize?: number;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

export function TreeView({
  nodes,
  defaultExpanded,
  expanded: controlledExpanded,
  onExpandChange,
  selected,
  onSelect,
  expandIcon,
  indentSize = 20,
  style,
  ref,
}: TreeViewProps) {
  const theme = useTheme();
  const [internalExpanded, setInternalExpanded] = useState<string[]>(
    defaultExpanded ?? [],
  );

  const expanded = controlledExpanded ?? internalExpanded;

  const toggleExpand = useCallback(
    (id: string) => {
      const next = expanded.includes(id)
        ? expanded.filter((e) => e !== id)
        : [...expanded, id];

      if (!controlledExpanded) {
        setInternalExpanded(next);
      }
      onExpandChange?.(next);
    },
    [expanded, controlledExpanded, onExpandChange],
  );

  const transitionValue = transition('background-color');

  const containerStyle: CSSProperties = mergeStyles(
    {
      fontFamily: theme.fontFamily.sans,
      fontSize: theme.fontSize[14],
      color: theme.semantic.text.primary,
    },
    style,
  );

  const chevronContent = expandIcon ?? <TreeChevron />;

  function renderNode(node: TreeNode, depth: number): ReactNode {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.includes(node.id);
    const isSelected = selected === node.id;

    const rowStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: theme.space[3],
      padding: `${theme.space[3]}px ${theme.space[4]}px`,
      paddingLeft: depth * indentSize + theme.space[4],
      cursor: node.disabled ? 'not-allowed' : 'pointer',
      backgroundColor: isSelected
        ? theme.semantic.surface.selected
        : 'transparent',
      borderRadius: theme.radius.sm,
      transition: transitionValue,
      opacity: node.disabled ? 0.5 : 1,
      outline: 'none',
      userSelect: 'none',
    };

    const chevronStyle: CSSProperties = {
      width: 16,
      height: 16,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.semantic.icon.muted,
      transition: `transform ${theme.duration.base}ms ${theme.easing.standard}`,
      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
      flexShrink: 0,
    };

    const spacerStyle: CSSProperties = {
      width: 16,
      flexShrink: 0,
    };

    return (
      <div key={node.id}>
        <div
          role="treeitem"
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-selected={isSelected}
          aria-disabled={node.disabled || undefined}
          tabIndex={node.disabled ? -1 : 0}
          style={rowStyle}
          onClick={() => {
            if (node.disabled) return;
            if (hasChildren) toggleExpand(node.id);
            onSelect?.(node.id);
          }}
          onKeyDown={(e) => {
            if (node.disabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (hasChildren) toggleExpand(node.id);
              onSelect?.(node.id);
            }
            if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
              e.preventDefault();
              toggleExpand(node.id);
            }
            if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
              e.preventDefault();
              toggleExpand(node.id);
            }
          }}
        >
          {hasChildren ? (
            <span style={chevronStyle}>{chevronContent}</span>
          ) : (
            <span style={spacerStyle} />
          )}
          {node.icon && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: 16,
                color: theme.semantic.icon.default,
                flexShrink: 0,
              }}
            >
              {node.icon}
            </span>
          )}
          <span
            style={{
              fontWeight: isSelected
                ? theme.fontWeight.semibold
                : theme.fontWeight.regular,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {node.label}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div role="group">
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} role="tree" style={containerStyle}>
      {nodes.map((node) => renderNode(node, 0))}
    </div>
  );
}
