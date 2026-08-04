import { useState } from 'react';
import { Sidebar } from 'jind-ui-kit';
import type { SidebarSection } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const sidebarProps = [
  { name: 'sections', type: 'SidebarSection[]', description: 'Array of navigation sections, each with an optional title and items' },
  { name: 'header', type: 'ReactNode', description: 'Content rendered above the navigation' },
  { name: 'footer', type: 'ReactNode', description: 'Content rendered below the navigation' },
  { name: 'collapsed', type: 'boolean', default: 'false', description: 'Whether the sidebar is in collapsed (icon-only) mode' },
  { name: 'onCollapsedChange', type: '(collapsed: boolean) => void', description: 'Callback when the collapse toggle is clicked; renders the toggle button when provided' },
  { name: 'width', type: 'number', default: '260', description: 'Expanded width in pixels' },
  { name: 'collapsedWidth', type: 'number', default: '64', description: 'Collapsed width in pixels' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
  { name: 'ref', type: 'Ref<HTMLDivElement>', description: 'Forwarded ref to the container element' },
];

const sectionTypeProps = [
  { name: 'title', type: 'string', description: 'Optional section heading displayed above its items' },
  { name: 'items', type: 'SidebarItem[]', description: 'Navigation items in this section' },
];

const itemTypeProps = [
  { name: 'label', type: 'string', description: 'Display text for the item' },
  { name: 'icon', type: 'string', description: 'Icon or emoji displayed before the label' },
  { name: 'href', type: 'string', description: 'Link destination; wraps the item in an anchor tag' },
  { name: 'onClick', type: '() => void', description: 'Click handler' },
  { name: 'active', type: 'boolean', description: 'Highlights the item as the current selection' },
  { name: 'badge', type: 'string | number', description: 'Badge content displayed after the label' },
  { name: 'children', type: 'SidebarItem[]', description: 'Nested sub-items for expandable sections' },
  { name: 'disabled', type: 'boolean', description: 'Disables the item interaction' },
];

const basicSections: SidebarSection[] = [
  {
    items: [
      { label: 'Dashboard', icon: '⌂' },
      { label: 'Projects', icon: '☰' },
      { label: 'Messages', icon: '✉', badge: 3 },
      { label: 'Settings', icon: '⚙' },
    ],
  },
];

const groupedSections: SidebarSection[] = [
  {
    title: 'Workspace',
    items: [
      { label: 'Dashboard', icon: '⌂' },
      { label: 'Projects', icon: '☰' },
      { label: 'Calendar', icon: '□' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Profile', icon: '☺' },
      { label: 'Settings', icon: '⚙' },
      { label: 'Billing', icon: '☆', disabled: true },
    ],
  },
];

const nestedSections: SidebarSection[] = [
  {
    items: [
      { label: 'Home', icon: '⌂' },
      {
        label: 'Documents',
        icon: '☰',
        children: [
          { label: 'Recent' },
          { label: 'Shared with me' },
          { label: 'Archived' },
        ],
      },
      { label: 'Analytics', icon: '▲', active: true },
      { label: 'Help', icon: '❓' },
    ],
  },
];

const activeSections: SidebarSection[] = [
  {
    items: [
      { label: 'Overview', icon: '⌂' },
      { label: 'Inbox', icon: '✉', badge: 12 },
      { label: 'Tasks', icon: '☑', active: true },
      { label: 'Reports', icon: '▲' },
      { label: 'Team', icon: '☺', badge: 'New' },
    ],
  },
];

function CollapsibleSidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sidebar
      sections={basicSections}
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
      header={<strong>{collapsed ? 'T' : 'Jind'}</strong>}
      style={{ height: 340 }}
    />
  );
}

export function ComponentSidebar() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="sidebar" />
        <h1 className="page-title">Sidebar</h1>
        <p className="page-description">
          Vertical navigation sidebar with sections, icons, badges, nested
          items, and a collapsible mode with tooltip labels.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Sidebar</h2>
        <Preview
          align="left"
          code={`<Sidebar
  sections={[{
    items: [
      { label: 'Dashboard', icon: '⌂' },
      { label: 'Projects', icon: '☰' },
      { label: 'Messages', icon: '✉', badge: 3 },
      { label: 'Settings', icon: '⚙' },
    ],
  }]}
  style={{ height: 280 }}
/>`}
        >
          <Sidebar sections={basicSections} style={{ height: 280 }} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Sections</h2>
        <Preview
          align="left"
          code={`<Sidebar
  sections={[
    {
      title: 'Workspace',
      items: [
        { label: 'Dashboard', icon: '⌂' },
        { label: 'Projects', icon: '☰' },
        { label: 'Calendar', icon: '□' },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Profile', icon: '☺' },
        { label: 'Settings', icon: '⚙' },
        { label: 'Billing', icon: '☆', disabled: true },
      ],
    },
  ]}
  header={<strong>Jind</strong>}
  style={{ height: 380 }}
/>`}
        >
          <Sidebar
            sections={groupedSections}
            header={<strong>Jind</strong>}
            style={{ height: 380 }}
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Collapsible</h2>
        <Preview
          align="left"
          code={`function CollapsibleSidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sidebar
      sections={sections}
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
      header={<strong>{collapsed ? 'T' : 'Jind'}</strong>}
      style={{ height: 340 }}
    />
  );
}`}
        >
          <CollapsibleSidebarDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Active State and Nested Items</h2>
        <Preview
          align="left"
          code={`<Sidebar
  sections={[{
    items: [
      { label: 'Home', icon: '⌂' },
      {
        label: 'Documents',
        icon: '☰',
        children: [
          { label: 'Recent' },
          { label: 'Shared with me' },
          { label: 'Archived' },
        ],
      },
      { label: 'Analytics', icon: '▲', active: true },
      { label: 'Help', icon: '❓' },
    ],
  }]}
  style={{ height: 320 }}
/>`}
        >
          <Sidebar sections={nestedSections} style={{ height: 320 }} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Sidebar Props</h2>
        <PropsTable props={sidebarProps} />
      </div>

      <div className="section">
        <h2 className="section-title">SidebarSection Type</h2>
        <PropsTable props={sectionTypeProps} />
      </div>

      <div className="section">
        <h2 className="section-title">SidebarItem Type</h2>
        <PropsTable props={itemTypeProps} />
      </div>
    </div>
  );
}
