import { Breadcrumbs } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'items', type: 'BreadcrumbItem[]', description: 'Array of breadcrumb items (label, href?, onClick?)' },
  { name: 'separator', type: 'ReactNode', description: 'Custom separator between items (default: "/")' },
  { name: 'maxItems', type: 'number', description: 'Truncate with ellipsis when items exceed this count' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const itemProps = [
  { name: 'label', type: 'string', description: 'Display text for the breadcrumb' },
  { name: 'href', type: 'string', description: 'URL for the breadcrumb link' },
  { name: 'onClick', type: '() => void', description: 'Click handler (used when no href)' },
];

export function ComponentBreadcrumbs() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="breadcrumbs" />
        <h1 className="page-title">Breadcrumbs</h1>
        <p className="page-description">
          Navigation trail showing the user's location in a hierarchy.
          The last item is always the active page (bold, non-interactive).
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          code={`<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Widget Pro' },
]} />`}
        >
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Widget Pro' },
          ]} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Separator</h2>
        <Preview
          code={`<Breadcrumbs
  separator="›"
  items={[
    { label: 'Dashboard', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile' },
  ]}
/>`}
        >
          <Breadcrumbs
            separator="›"
            items={[
              { label: 'Dashboard', href: '/' },
              { label: 'Settings', href: '/settings' },
              { label: 'Profile' },
            ]}
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Truncated</h2>
        <Preview
          code={`<Breadcrumbs
  maxItems={3}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/cat' },
    { label: 'Subcategory', href: '/sub' },
    { label: 'Section', href: '/section' },
    { label: 'Current Page' },
  ]}
/>`}
        >
          <Breadcrumbs
            maxItems={3}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Category', href: '/cat' },
              { label: 'Subcategory', href: '/sub' },
              { label: 'Section', href: '/section' },
              { label: 'Current Page' },
            ]}
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>

      <div className="section">
        <h2 className="section-title">BreadcrumbItem</h2>
        <PropsTable props={itemProps} />
      </div>
    </div>
  );
}
