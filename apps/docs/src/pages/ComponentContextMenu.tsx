import { ContextMenu } from 'jind-ui-kit';
import type { ContextMenuItem } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const contextMenuProps = [
  { name: 'items', type: 'ContextMenuItem[]', description: 'Array of menu items to display' },
  { name: 'children', type: 'ReactNode', description: 'The element that triggers the context menu on right-click' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents the context menu from opening' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
  { name: 'ref', type: 'Ref<HTMLDivElement>', description: 'Ref forwarded to the wrapper div' },
];

const contextMenuItemProps = [
  { name: 'label', type: 'string', description: 'Display text for the menu item' },
  { name: 'icon', type: 'string', description: 'Iconoir icon name (without the iconoir- prefix)' },
  { name: 'shortcut', type: 'string', description: 'Keyboard shortcut hint shown on the right' },
  { name: 'onSelect', type: '() => void', description: 'Callback invoked when the item is clicked' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction with the item' },
  { name: 'danger', type: 'boolean', default: 'false', description: 'Renders the item in a danger/destructive color' },
  { name: 'separator', type: 'boolean', default: 'false', description: 'Renders a visual separator line instead of a menu item' },
];

const basicItems: ContextMenuItem[] = [
  { label: 'Cut', onSelect: () => {} },
  { label: 'Copy', onSelect: () => {} },
  { label: 'Paste', onSelect: () => {} },
];

const shortcutItems: ContextMenuItem[] = [
  { label: 'Undo', shortcut: '⌘Z', onSelect: () => {} },
  { label: 'Redo', shortcut: '⇧⌘Z', onSelect: () => {} },
  { separator: true, label: '' },
  { label: 'Cut', shortcut: '⌘X', onSelect: () => {} },
  { label: 'Copy', shortcut: '⌘C', onSelect: () => {} },
  { label: 'Paste', shortcut: '⌘V', onSelect: () => {} },
];

const separatorItems: ContextMenuItem[] = [
  { label: 'Edit', icon: 'edit', onSelect: () => {} },
  { label: 'Duplicate', icon: 'copy', onSelect: () => {} },
  { separator: true, label: '' },
  { label: 'Archive', icon: 'archive', onSelect: () => {} },
  { label: 'Move to...', icon: 'folder', disabled: true, onSelect: () => {} },
  { separator: true, label: '' },
  { label: 'Delete', icon: 'trash', danger: true, onSelect: () => {} },
];

const triggerAreaStyle: React.CSSProperties = {
  padding: 32,
  border: '1px dashed var(--border-default, #ccc)',
  borderRadius: 8,
  textAlign: 'center',
  userSelect: 'none',
};

export function ComponentContextMenu() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="context-menu" />
        <h1 className="page-title">ContextMenu</h1>
        <p className="page-description">
          A right-click context menu rendered via a portal. Supports icons,
          keyboard shortcut hints, disabled items, danger styling, and visual
          separators between groups.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Usage</h2>
        <Preview
          code={`<ContextMenu
  items={[
    { label: 'Cut', onSelect: () => {} },
    { label: 'Copy', onSelect: () => {} },
    { label: 'Paste', onSelect: () => {} },
  ]}
>
  <div style={{ padding: 32, border: '1px dashed #ccc', borderRadius: 8, textAlign: 'center' }}>
    Right-click here
  </div>
</ContextMenu>`}
        >
          <ContextMenu items={basicItems}>
            <div style={triggerAreaStyle}>Right-click here</div>
          </ContextMenu>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Shortcuts</h2>
        <Preview
          code={`<ContextMenu
  items={[
    { label: 'Undo', shortcut: '⌘Z', onSelect: () => {} },
    { label: 'Redo', shortcut: '⇧⌘Z', onSelect: () => {} },
    { separator: true, label: '' },
    { label: 'Cut', shortcut: '⌘X', onSelect: () => {} },
    { label: 'Copy', shortcut: '⌘C', onSelect: () => {} },
    { label: 'Paste', shortcut: '⌘V', onSelect: () => {} },
  ]}
>
  <div style={{ padding: 32, border: '1px dashed #ccc', borderRadius: 8, textAlign: 'center' }}>
    Right-click for shortcuts
  </div>
</ContextMenu>`}
        >
          <ContextMenu items={shortcutItems}>
            <div style={triggerAreaStyle}>Right-click for shortcuts</div>
          </ContextMenu>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Icons, Separator, and Danger</h2>
        <Preview
          code={`<ContextMenu
  items={[
    { label: 'Edit', icon: 'edit', onSelect: () => {} },
    { label: 'Duplicate', icon: 'copy', onSelect: () => {} },
    { separator: true, label: '' },
    { label: 'Archive', icon: 'archive', onSelect: () => {} },
    { label: 'Move to...', icon: 'folder', disabled: true, onSelect: () => {} },
    { separator: true, label: '' },
    { label: 'Delete', icon: 'trash', danger: true, onSelect: () => {} },
  ]}
>
  <div style={{ padding: 32, border: '1px dashed #ccc', borderRadius: 8, textAlign: 'center' }}>
    Right-click for full menu
  </div>
</ContextMenu>`}
        >
          <ContextMenu items={separatorItems}>
            <div style={triggerAreaStyle}>Right-click for full menu</div>
          </ContextMenu>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">ContextMenu Props</h2>
        <PropsTable props={contextMenuProps} />
      </div>

      <div className="section">
        <h2 className="section-title">ContextMenuItem Props</h2>
        <PropsTable props={contextMenuItemProps} />
      </div>
    </div>
  );
}
