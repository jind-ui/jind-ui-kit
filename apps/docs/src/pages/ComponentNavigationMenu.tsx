import { NavigationMenu } from 'jind-ui-kit';
import type { NavMenuItem } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const navigationMenuProps = [
  { name: 'items', type: 'NavMenuItem[]', description: 'Array of menu items to render' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles for the nav element' },
  { name: 'ref', type: 'Ref<HTMLElement>', description: 'Ref forwarded to the root nav element' },
];

const navMenuItemProps = [
  { name: 'label', type: 'string', description: 'Display text for the menu item' },
  { name: 'href', type: 'string', description: 'URL the item links to' },
  { name: 'children', type: 'NavMenuItem[]', description: 'Submenu items shown in a dropdown' },
  { name: 'description', type: 'string', description: 'Secondary text shown below the label in dropdowns' },
  { name: 'icon', type: 'string', description: 'Icon identifier for the item' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction with the item' },
];

const basicItems: NavMenuItem[] = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
];

const submenuItems: NavMenuItem[] = [
  { label: 'Home', href: '#' },
  {
    label: 'Products',
    children: [
      { label: 'Widget Pro', href: '#', description: 'Our flagship product' },
      { label: 'Widget Lite', href: '#', description: 'A lightweight alternative' },
      { label: 'Enterprise', href: '#', description: 'For large teams' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Documentation', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Support', href: '#', disabled: true },
    ],
  },
  { label: 'Pricing', href: '#' },
];

export function ComponentNavigationMenu() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="navigation-menu" />
        <h1 className="page-title">NavigationMenu</h1>
        <p className="page-description">
          A horizontal navigation bar with optional dropdown submenus. Items can
          link directly or expand a panel of child items with labels and
          descriptions. Supports disabled states and hover-triggered dropdowns.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Navigation</h2>
        <Preview
          code={`<NavigationMenu
  items={[
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ]}
/>`}
        >
          <NavigationMenu items={basicItems} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Submenus</h2>
        <Preview
          code={`<NavigationMenu
  items={[
    { label: 'Home', href: '#' },
    {
      label: 'Products',
      children: [
        { label: 'Widget Pro', href: '#', description: 'Our flagship product' },
        { label: 'Widget Lite', href: '#', description: 'A lightweight alternative' },
        { label: 'Enterprise', href: '#', description: 'For large teams' },
      ],
    },
    {
      label: 'Resources',
      children: [
        { label: 'Documentation', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Support', href: '#', disabled: true },
      ],
    },
    { label: 'Pricing', href: '#' },
  ]}
/>`}
        >
          <NavigationMenu items={submenuItems} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">NavigationMenu Props</h2>
        <PropsTable props={navigationMenuProps} />
      </div>

      <div className="section">
        <h2 className="section-title">NavMenuItem Props</h2>
        <PropsTable props={navMenuItemProps} />
      </div>
    </div>
  );
}
