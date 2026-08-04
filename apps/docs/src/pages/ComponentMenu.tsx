import { Menu, MenuItem } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const menuProps = [
  { name: 'header', type: 'string', description: 'Optional section header text at the top of the menu' },
  { name: 'width', type: 'number | string', description: 'Fixed width of the menu container' },
  { name: 'dividers', type: 'boolean', default: 'false', description: 'Show a themed border between each menu item' },
  { name: 'children', type: 'ReactNode', description: 'Menu items' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const menuItemProps = [
  { name: 'icon', type: 'string', description: 'Iconoir icon name rendered before the label' },
  { name: 'swatch', type: 'string', description: 'CSS color for a circular swatch indicator' },
  { name: 'selected', type: 'boolean', default: 'false', description: 'Show a checkmark trailing indicator' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction and dims the item' },
  { name: 'trailing', type: 'ReactNode', description: 'Custom content rendered on the right side' },
  { name: 'onClick', type: '() => void', description: 'Click handler' },
  { name: 'children', type: 'ReactNode', description: 'Item label content' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentMenu() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="menu" />
        <h1 className="page-title">Menu</h1>
        <p className="page-description">
          Dropdown-style list container paired with MenuItem for building
          action menus, context menus, and selection lists.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Menu</h2>
        <Preview
          code={`<Menu width={220}>
  <MenuItem icon="edit" onClick={() => {}}>Edit</MenuItem>
  <MenuItem icon="copy" onClick={() => {}}>Duplicate</MenuItem>
  <MenuItem icon="trash" onClick={() => {}}>Delete</MenuItem>
</Menu>`}
        >
          <Menu width={220}>
            <MenuItem icon="edit" onClick={() => {}}>Edit</MenuItem>
            <MenuItem icon="copy" onClick={() => {}}>Duplicate</MenuItem>
            <MenuItem icon="trash" onClick={() => {}}>Delete</MenuItem>
          </Menu>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Header</h2>
        <Preview
          code={`<Menu header="Actions" width={220}>
  <MenuItem icon="settings">Settings</MenuItem>
  <MenuItem icon="log-out">Sign Out</MenuItem>
</Menu>`}
        >
          <Menu header="Actions" width={220}>
            <MenuItem icon="settings">Settings</MenuItem>
            <MenuItem icon="log-out">Sign Out</MenuItem>
          </Menu>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Dividers</h2>
        <Preview
          code={`<Menu dividers width={220}>
  <MenuItem icon="edit">Edit</MenuItem>
  <MenuItem icon="copy">Duplicate</MenuItem>
  <MenuItem icon="trash">Delete</MenuItem>
</Menu>`}
        >
          <Menu dividers width={220}>
            <MenuItem icon="edit">Edit</MenuItem>
            <MenuItem icon="copy">Duplicate</MenuItem>
            <MenuItem icon="trash">Delete</MenuItem>
          </Menu>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Selected and Disabled</h2>
        <Preview
          code={`<Menu width={220}>
  <MenuItem selected>Selected Item</MenuItem>
  <MenuItem disabled>Disabled Item</MenuItem>
  <MenuItem>Normal Item</MenuItem>
</Menu>`}
        >
          <Menu width={220}>
            <MenuItem selected>Selected Item</MenuItem>
            <MenuItem disabled>Disabled Item</MenuItem>
            <MenuItem>Normal Item</MenuItem>
          </Menu>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Menu Props</h2>
        <PropsTable props={menuProps} />
      </div>

      <div className="section">
        <h2 className="section-title">MenuItem Props</h2>
        <PropsTable props={menuItemProps} />
      </div>
    </div>
  );
}
