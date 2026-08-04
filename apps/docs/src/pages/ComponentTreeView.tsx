import { useState } from 'react';
import { TreeView, type TreeNode } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'nodes', type: 'TreeNode[]', description: 'Hierarchical tree data' },
  { name: 'defaultExpanded', type: 'string[]', description: 'Initially expanded node IDs (uncontrolled)' },
  { name: 'expanded', type: 'string[]', description: 'Controlled expanded node IDs' },
  { name: 'onExpandChange', type: '(ids: string[]) => void', description: 'Callback when expanded state changes' },
  { name: 'selected', type: 'string | null', description: 'Currently selected node ID' },
  { name: 'onSelect', type: '(id: string) => void', description: 'Callback when a node is selected' },
  { name: 'indentSize', type: 'number', description: 'Indent per depth level in px (default: 20)' },
];

const nodeProps = [
  { name: 'id', type: 'string', description: 'Unique node identifier' },
  { name: 'label', type: 'string', description: 'Display text' },
  { name: 'icon', type: 'string', description: 'Iconoir icon name' },
  { name: 'children', type: 'TreeNode[]', description: 'Child nodes for nesting' },
  { name: 'disabled', type: 'boolean', description: 'Disable interaction' },
];

const fileTree: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: 'folder',
    children: [
      {
        id: 'components',
        label: 'components',
        icon: 'folder',
        children: [
          { id: 'button', label: 'Button.tsx', icon: 'code' },
          { id: 'input', label: 'Input.tsx', icon: 'code' },
          { id: 'modal', label: 'Modal.tsx', icon: 'code' },
        ],
      },
      {
        id: 'hooks',
        label: 'hooks',
        icon: 'folder',
        children: [
          { id: 'use-theme', label: 'useTheme.ts', icon: 'code' },
          { id: 'use-disclosure', label: 'useDisclosure.ts', icon: 'code' },
        ],
      },
      { id: 'index', label: 'index.ts', icon: 'code' },
    ],
  },
  {
    id: 'package',
    label: 'package.json',
    icon: 'page',
  },
  {
    id: 'readme',
    label: 'README.md',
    icon: 'page',
  },
];

function TreeViewDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div style={{ width: 280, border: '1px solid #e2e5e9', borderRadius: 8, padding: 8 }}>
      <TreeView
        nodes={fileTree}
        defaultExpanded={['src', 'components']}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
}

export function ComponentTreeView() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="tree-view" />
        <h1 className="page-title">TreeView</h1>
        <p className="page-description">
          Hierarchical tree structure with expand/collapse, selection,
          keyboard navigation (arrow keys), and customizable indentation.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">File Explorer</h2>
        <Preview
          code={`const [selected, setSelected] = useState(null);

<TreeView
  nodes={[
    { id: 'src', label: 'src', icon: 'folder',
      children: [
        { id: 'btn', label: 'Button.tsx', icon: 'code' },
        ...
      ] },
    { id: 'pkg', label: 'package.json', icon: 'page' },
  ]}
  defaultExpanded={['src', 'components']}
  selected={selected}
  onSelect={setSelected}
/>`}
        >
          <TreeViewDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Keyboard Navigation</h2>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
          <p><strong>Enter / Space</strong> — Select node and toggle expand</p>
          <p><strong>Arrow Right</strong> — Expand a collapsed node</p>
          <p><strong>Arrow Left</strong> — Collapse an expanded node</p>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">TreeView Props</h2>
        <PropsTable props={props} />
      </div>

      <div className="section">
        <h2 className="section-title">TreeNode</h2>
        <PropsTable props={nodeProps} />
      </div>
    </div>
  );
}
