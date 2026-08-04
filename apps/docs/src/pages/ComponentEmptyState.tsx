import { EmptyState, Button } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const emptyStateProps = [
  { name: 'title', type: 'string', description: 'Primary heading text (required)' },
  { name: 'description', type: 'string', description: 'Secondary explanatory text below the title' },
  { name: 'icon', type: 'string', description: 'Emoji or character displayed above the title' },
  { name: 'action', type: 'ReactNode', description: 'Action element (e.g. a Button) rendered below the description' },
  { name: 'variant', type: "'subtle' | 'card'", default: "'subtle'", description: "Visual style. 'card' adds a dashed border and background" },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
  { name: 'ref', type: 'Ref<HTMLDivElement>', description: 'Ref forwarded to the wrapper div' },
];

export function ComponentEmptyState() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="empty-state" />
        <h1 className="page-title">EmptyState</h1>
        <p className="page-description">
          A placeholder shown when a section has no content. Communicates the
          empty state clearly with a title, optional description, icon, and
          call-to-action. Available in subtle and card variants.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Usage</h2>
        <Preview
          code={`<EmptyState
  title="No results found"
  description="Try adjusting your search or filters to find what you're looking for."
/>`}
        >
          <EmptyState
            title="No results found"
            description="Try adjusting your search or filters to find what you're looking for."
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Icon</h2>
        <Preview
          code={`<EmptyState
  icon="📦"
  title="No items yet"
  description="Items you add will appear here."
/>`}
        >
          <EmptyState
            icon={"📦"}
            title="No items yet"
            description="Items you add will appear here."
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Action Button</h2>
        <Preview
          code={`<EmptyState
  icon="📄"
  title="No documents"
  description="Get started by creating your first document."
  action={<Button variant="primary">Create Document</Button>}
/>`}
        >
          <EmptyState
            icon={"📄"}
            title="No documents"
            description="Get started by creating your first document."
            action={<Button variant="primary">Create Document</Button>}
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Card Variant</h2>
        <Preview
          code={`<EmptyState
  variant="card"
  icon="🔍"
  title="No search results"
  description="We couldn't find anything matching your query. Try different keywords."
  action={<Button variant="secondary">Clear Search</Button>}
/>`}
        >
          <EmptyState
            variant="card"
            icon={"🔍"}
            title="No search results"
            description="We couldn't find anything matching your query. Try different keywords."
            action={<Button variant="secondary">Clear Search</Button>}
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={emptyStateProps} />
      </div>
    </div>
  );
}
