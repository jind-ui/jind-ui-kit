import { useState } from 'react';
import { Pagination } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'page', type: 'number', description: 'Current active page (1-indexed)' },
  { name: 'totalPages', type: 'number', description: 'Total number of pages' },
  { name: 'onPageChange', type: '(page: number) => void', description: 'Callback when a page is selected' },
  { name: 'siblingCount', type: 'number', description: 'Pages shown around current page (default: 1)' },
  { name: 'showEdges', type: 'boolean', description: 'Always show first and last page (default: true)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function PaginationDemo() {
  const [page, setPage] = useState(5);
  return <Pagination page={page} totalPages={20} onPageChange={setPage} />;
}

function SmallPaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={5} onPageChange={setPage} />;
}

export function ComponentPagination() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="pagination" />
        <h1 className="page-title">Pagination</h1>
        <p className="page-description">
          Page navigation with prev/next buttons, page numbers, and ellipsis
          for large ranges. Click to try it live.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Interactive</h2>
        <Preview
          code={`const [page, setPage] = useState(5);

<Pagination
  page={page}
  totalPages={20}
  onPageChange={setPage}
/>`}
        >
          <PaginationDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Few Pages</h2>
        <Preview
          code={`<Pagination page={page} totalPages={5} onPageChange={setPage} />`}
        >
          <SmallPaginationDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
