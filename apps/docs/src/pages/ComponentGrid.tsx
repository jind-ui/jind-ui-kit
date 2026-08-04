import { Grid, Box } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const props = [
  { name: 'columns', type: 'number | string', description: 'Grid template columns (number = repeat, string = raw CSS)' },
  { name: 'rows', type: 'number | string', description: 'Grid template rows' },
  { name: 'gap', type: 'Space (1-12)', default: '3', description: 'Grid gap' },
  { name: 'as', type: 'ElementType', default: "'div'", description: 'Render as different element' },
];

function Cell({ children }: { children: string }) {
  return (
    <Box p={5} bg="#eff5ff" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#1a72f6' }}>
      {children}
    </Box>
  );
}

export function ComponentGrid() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Grid</h1>
        <p className="page-description">
          CSS Grid layout primitive with column, row, and gap props.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Grid</h2>
        <Preview
          align="column"
          code={`<Grid columns={3} gap={3}>
  <Box p={5} bg="#eff5ff" radius="sm">1</Box>
  <Box p={5} bg="#eff5ff" radius="sm">2</Box>
  <Box p={5} bg="#eff5ff" radius="sm">3</Box>
  <Box p={5} bg="#eff5ff" radius="sm">4</Box>
  <Box p={5} bg="#eff5ff" radius="sm">5</Box>
  <Box p={5} bg="#eff5ff" radius="sm">6</Box>
</Grid>`}
        >
          <Grid columns={3} gap={3} style={{ width: '100%' }}>
            <Cell>1</Cell><Cell>2</Cell><Cell>3</Cell>
            <Cell>4</Cell><Cell>5</Cell><Cell>6</Cell>
          </Grid>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Columns</h2>
        <Preview
          align="column"
          code={`<Grid columns="1fr 2fr 1fr" gap={4}>
  <Box>Sidebar</Box>
  <Box>Main</Box>
  <Box>Aside</Box>
</Grid>`}
        >
          <Grid columns="1fr 2fr 1fr" gap={4} style={{ width: '100%' }}>
            <Cell>Sidebar</Cell>
            <Cell>Main Content</Cell>
            <Cell>Aside</Cell>
          </Grid>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Nested Grid — Dashboard</h2>
        <p className="section-text">
          Nest grids to build complex layouts. The outer grid sets the page structure,
          inner grids handle content areas independently.
        </p>
        <Preview
          align="column"
          code={`<Grid columns="240px 1fr" gap={4}>
  {/* Sidebar */}
  <Box p={4} bg="#f5f0ff" radius="md">
    <Grid columns={1} gap={2}>
      <Box p={3} bg="#ebe0ff" radius="sm">Nav Item 1</Box>
      <Box p={3} bg="#ebe0ff" radius="sm">Nav Item 2</Box>
      <Box p={3} bg="#ebe0ff" radius="sm">Nav Item 3</Box>
    </Grid>
  </Box>

  {/* Main content with nested grid */}
  <Grid columns={1} gap={4}>
    <Box p={4} bg="#eff5ff" radius="md">Header</Box>
    <Grid columns={3} gap={3}>
      <Box p={4} bg="#eff5ff" radius="sm">Card 1</Box>
      <Box p={4} bg="#eff5ff" radius="sm">Card 2</Box>
      <Box p={4} bg="#eff5ff" radius="sm">Card 3</Box>
    </Grid>
  </Grid>
</Grid>`}
        >
          <Grid columns="240px 1fr" gap={4} style={{ width: '100%' }}>
            <Box p={4} bg="#f5f0ff" radius="md">
              <Grid columns={1} gap={2}>
                <Box p={3} bg="#ebe0ff" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#7c3aed' }}>Nav Item 1</Box>
                <Box p={3} bg="#ebe0ff" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#7c3aed' }}>Nav Item 2</Box>
                <Box p={3} bg="#ebe0ff" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#7c3aed' }}>Nav Item 3</Box>
              </Grid>
            </Box>
            <Grid columns={1} gap={4}>
              <Box p={4} bg="#eff5ff" radius="md" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#1a72f6' }}>Header</Box>
              <Grid columns={3} gap={3}>
                <Cell>Card 1</Cell>
                <Cell>Card 2</Cell>
                <Cell>Card 3</Cell>
              </Grid>
            </Grid>
          </Grid>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Nested Grid — Gallery with Sidebar</h2>
        <Preview
          align="column"
          code={`<Grid columns="1fr 300px" gap={4}>
  {/* Photo grid */}
  <Grid columns={2} gap={3}>
    <Box p={8} bg="#fef3c7" radius="sm">Photo 1</Box>
    <Box p={8} bg="#fef3c7" radius="sm">Photo 2</Box>
    <Box p={8} bg="#fef3c7" radius="sm">Photo 3</Box>
    <Box p={8} bg="#fef3c7" radius="sm">Photo 4</Box>
  </Grid>

  {/* Details panel */}
  <Grid columns={1} gap={3}>
    <Box p={4} bg="#dcfce7" radius="sm">Title</Box>
    <Box p={4} bg="#dcfce7" radius="sm">Description</Box>
    <Box p={4} bg="#dcfce7" radius="sm">Metadata</Box>
  </Grid>
</Grid>`}
        >
          <Grid columns="1fr 300px" gap={4} style={{ width: '100%' }}>
            <Grid columns={2} gap={3}>
              <Box p={8} bg="#fef3c7" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#92400e' }}>Photo 1</Box>
              <Box p={8} bg="#fef3c7" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#92400e' }}>Photo 2</Box>
              <Box p={8} bg="#fef3c7" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#92400e' }}>Photo 3</Box>
              <Box p={8} bg="#fef3c7" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#92400e' }}>Photo 4</Box>
            </Grid>
            <Grid columns={1} gap={3}>
              <Box p={4} bg="#dcfce7" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#166534' }}>Title</Box>
              <Box p={4} bg="#dcfce7" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#166534' }}>Description</Box>
              <Box p={4} bg="#dcfce7" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#166534' }}>Metadata</Box>
            </Grid>
          </Grid>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Nested Grid — Form Layout</h2>
        <Preview
          align="column"
          code={`<Grid columns={1} gap={4}>
  {/* Two-column field row */}
  <Grid columns={2} gap={3}>
    <Box p={3} bg="#fce7f3" radius="sm">First Name</Box>
    <Box p={3} bg="#fce7f3" radius="sm">Last Name</Box>
  </Grid>
  {/* Full-width field */}
  <Box p={3} bg="#fce7f3" radius="sm">Email Address</Box>
  {/* Three-column row */}
  <Grid columns={3} gap={3}>
    <Box p={3} bg="#fce7f3" radius="sm">City</Box>
    <Box p={3} bg="#fce7f3" radius="sm">State</Box>
    <Box p={3} bg="#fce7f3" radius="sm">ZIP</Box>
  </Grid>
</Grid>`}
        >
          <Grid columns={1} gap={4} style={{ width: '100%' }}>
            <Grid columns={2} gap={3}>
              <Box p={3} bg="#fce7f3" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#9d174d' }}>First Name</Box>
              <Box p={3} bg="#fce7f3" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#9d174d' }}>Last Name</Box>
            </Grid>
            <Box p={3} bg="#fce7f3" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#9d174d' }}>Email Address</Box>
            <Grid columns={3} gap={3}>
              <Box p={3} bg="#fce7f3" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#9d174d' }}>City</Box>
              <Box p={3} bg="#fce7f3" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#9d174d' }}>State</Box>
              <Box p={3} bg="#fce7f3" radius="sm" style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#9d174d' }}>ZIP</Box>
            </Grid>
          </Grid>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
