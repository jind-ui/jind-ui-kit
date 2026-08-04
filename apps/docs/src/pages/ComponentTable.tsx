import { Table, TableHeader, TableRow, TableCell } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const tableProps = [
  { name: 'children', type: 'ReactNode', description: 'Table content (thead, tbody, rows)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const tableHeaderProps = [
  { name: 'children', type: 'ReactNode', description: 'Header cells rendered inside a single <tr>' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles for the header row' },
];

const tableRowProps = [
  { name: 'children', type: 'ReactNode', description: 'Row cells' },
  { name: 'onClick', type: '() => void', description: 'Click handler; adds pointer cursor when provided' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const tableCellProps = [
  { name: 'children', type: 'ReactNode', description: 'Cell content' },
  { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment' },
  { name: 'width', type: 'number | string', description: 'Fixed cell width' },
  { name: 'header', type: 'boolean', default: 'false', description: 'Renders as <th> with label styling when true' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentTable() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="table" />
        <h1 className="page-title">Table</h1>
        <p className="page-description">
          Structured data table built from composable sub-components. Includes
          header styling, hover rows, and flexible cell alignment.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Table</h2>
        <Preview
          align="column"
          code={`<Table>
  <TableHeader>
    <TableCell header>Name</TableCell>
    <TableCell header>Role</TableCell>
    <TableCell header align="right">Status</TableCell>
  </TableHeader>
  <tbody>
    <TableRow>
      <TableCell>Alice Johnson</TableCell>
      <TableCell>Designer</TableCell>
      <TableCell align="right">Active</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Bob Smith</TableCell>
      <TableCell>Engineer</TableCell>
      <TableCell align="right">Active</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Clara Lee</TableCell>
      <TableCell>Product</TableCell>
      <TableCell align="right">Away</TableCell>
    </TableRow>
  </tbody>
</Table>`}
        >
          <Table>
            <TableHeader>
              <TableCell header>Name</TableCell>
              <TableCell header>Role</TableCell>
              <TableCell header align="right">Status</TableCell>
            </TableHeader>
            <tbody>
              <TableRow>
                <TableCell>Alice Johnson</TableCell>
                <TableCell>Designer</TableCell>
                <TableCell align="right">Active</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Smith</TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell align="right">Active</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Clara Lee</TableCell>
                <TableCell>Product</TableCell>
                <TableCell align="right">Away</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Table Props</h2>
        <PropsTable props={tableProps} />
      </div>

      <div className="section">
        <h2 className="section-title">TableHeader Props</h2>
        <PropsTable props={tableHeaderProps} />
      </div>

      <div className="section">
        <h2 className="section-title">TableRow Props</h2>
        <PropsTable props={tableRowProps} />
      </div>

      <div className="section">
        <h2 className="section-title">TableCell Props</h2>
        <PropsTable props={tableCellProps} />
      </div>
    </div>
  );
}
