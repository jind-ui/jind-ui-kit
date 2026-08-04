import { useState } from 'react';
import { CommandMenu, Button, type CommandItem } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { CodeBlock } from '../components/CodeBlock';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'open', type: 'boolean', description: 'Whether the command menu is visible' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback to toggle visibility' },
  { name: 'items', type: 'CommandItem[]', description: 'Array of command items' },
  { name: 'placeholder', type: 'string', description: 'Search input placeholder (default: "Search commands...")' },
  { name: 'emptyMessage', type: 'string', description: 'Message when no results match (default: "No results found.")' },
  { name: 'footer', type: 'ReactNode', description: 'Optional footer content' },
];

const itemProps = [
  { name: 'id', type: 'string', description: 'Unique identifier' },
  { name: 'label', type: 'string', description: 'Display label' },
  { name: 'icon', type: 'string', description: 'Iconoir icon name' },
  { name: 'description', type: 'string', description: 'Secondary description text' },
  { name: 'group', type: 'string', description: 'Group heading' },
  { name: 'shortcut', type: 'string', description: 'Keyboard shortcut display' },
  { name: 'onSelect', type: '() => void', description: 'Called when item is selected' },
  { name: 'disabled', type: 'boolean', description: 'Disable the item' },
];

function CommandMenuDemo() {
  const [open, setOpen] = useState(false);

  const items: CommandItem[] = [
    { id: '1', label: 'New File', icon: 'page-plus', group: 'File', shortcut: '⌘N', onSelect: () => {} },
    { id: '2', label: 'Open File', icon: 'folder', group: 'File', shortcut: '⌘O', onSelect: () => {} },
    { id: '3', label: 'Save', icon: 'floppy-disk', group: 'File', shortcut: '⌘S', onSelect: () => {} },
    { id: '4', label: 'Search', icon: 'search', group: 'Edit', shortcut: '⌘F', onSelect: () => {} },
    { id: '5', label: 'Replace', icon: 'refresh-double', group: 'Edit', shortcut: '⌘H', onSelect: () => {} },
    { id: '6', label: 'Settings', icon: 'settings', group: 'Preferences', onSelect: () => {} },
    { id: '7', label: 'Keyboard Shortcuts', icon: 'keyboard', group: 'Preferences', onSelect: () => {} },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Command Menu (⌘K)
      </Button>
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        items={items}
        footer={<span>↑↓ Navigate · Enter Select · Esc Close</span>}
      />
    </>
  );
}

export function ComponentCommandMenu() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="command-menu" />
        <h1 className="page-title">CommandMenu</h1>
        <p className="page-description">
          A command palette (Cmd+K style) with search filtering, keyboard
          navigation, grouped items, and shortcut display.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Interactive Demo</h2>
        <Preview
          code={`const [open, setOpen] = useState(false);

<CommandMenu
  open={open}
  onOpenChange={setOpen}
  items={[
    { id: '1', label: 'New File', icon: 'page-plus',
      group: 'File', shortcut: '⌘N', onSelect: () => {} },
    // ...more items
  ]}
  footer={<span>↑↓ Navigate · Enter Select</span>}
/>`}
        >
          <CommandMenuDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Keyboard Navigation</h2>
        <CodeBlock
          code={`// Register the Cmd+K shortcut globally
useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen(true);
    }
  }
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">CommandMenu Props</h2>
        <PropsTable props={props} />
      </div>

      <div className="section">
        <h2 className="section-title">CommandItem</h2>
        <PropsTable props={itemProps} />
      </div>
    </div>
  );
}
