import { Resizable, ResizablePanel } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const resizableProps = [
  { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction of the panels' },
  { name: 'children', type: 'ReactNode', description: 'ResizablePanel children' },
  { name: 'onResize', type: '(sizes: number[]) => void', description: 'Callback fired with panel size percentages when dragging' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
  { name: 'ref', type: 'Ref<HTMLDivElement>', description: 'Forwarded ref to the container element' },
];

const panelProps = [
  { name: 'children', type: 'ReactNode', description: 'Panel content' },
  { name: 'defaultSize', type: 'number', description: 'Initial size as a percentage of the container' },
  { name: 'minSize', type: 'number', default: '10', description: 'Minimum panel size percentage' },
  { name: 'maxSize', type: 'number', default: '90', description: 'Maximum panel size percentage' },
  { name: 'id', type: 'string', description: 'Unique identifier for the panel' },
];

const handleProps = [
  { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientation of the drag handle' },
  { name: 'onMouseDown', type: '(e: MouseEvent) => void', description: 'Mouse down handler (managed by Resizable)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const panelStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  background: 'var(--jind-surface-subtle, #f3f4f6)',
  borderRadius: 4,
  padding: 16,
  boxSizing: 'border-box' as const,
};

export function ComponentResizable() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="resizable" />
        <h1 className="page-title">Resizable</h1>
        <p className="page-description">
          Drag-to-resize panel layout. Combine Resizable with ResizablePanel
          children to create split panes with configurable size constraints.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Horizontal Split</h2>
        <Preview
          align="column"
          code={`<Resizable direction="horizontal" style={{ height: 200 }}>
  <ResizablePanel defaultSize={40} minSize={20}>
    <div>Left Panel</div>
  </ResizablePanel>
  <ResizablePanel defaultSize={60} minSize={20}>
    <div>Right Panel</div>
  </ResizablePanel>
</Resizable>`}
        >
          <div style={{ width: '100%' }}>
            <Resizable direction="horizontal" style={{ height: 200 }}>
              <ResizablePanel defaultSize={40} minSize={20}>
                <div style={panelStyle}>Left Panel</div>
              </ResizablePanel>
              <ResizablePanel defaultSize={60} minSize={20}>
                <div style={panelStyle}>Right Panel</div>
              </ResizablePanel>
            </Resizable>
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Vertical Split</h2>
        <Preview
          align="column"
          code={`<Resizable direction="vertical" style={{ height: 300 }}>
  <ResizablePanel defaultSize={40} minSize={15}>
    <div>Top Panel</div>
  </ResizablePanel>
  <ResizablePanel defaultSize={60} minSize={15}>
    <div>Bottom Panel</div>
  </ResizablePanel>
</Resizable>`}
        >
          <div style={{ width: '100%' }}>
            <Resizable direction="vertical" style={{ height: 300 }}>
              <ResizablePanel defaultSize={40} minSize={15}>
                <div style={panelStyle}>Top Panel</div>
              </ResizablePanel>
              <ResizablePanel defaultSize={60} minSize={15}>
                <div style={panelStyle}>Bottom Panel</div>
              </ResizablePanel>
            </Resizable>
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Three Panels</h2>
        <Preview
          align="column"
          code={`<Resizable direction="horizontal" style={{ height: 200 }}>
  <ResizablePanel defaultSize={25} minSize={15}>
    <div>Sidebar</div>
  </ResizablePanel>
  <ResizablePanel defaultSize={50} minSize={20}>
    <div>Main Content</div>
  </ResizablePanel>
  <ResizablePanel defaultSize={25} minSize={15}>
    <div>Inspector</div>
  </ResizablePanel>
</Resizable>`}
        >
          <div style={{ width: '100%' }}>
            <Resizable direction="horizontal" style={{ height: 200 }}>
              <ResizablePanel defaultSize={25} minSize={15}>
                <div style={panelStyle}>Sidebar</div>
              </ResizablePanel>
              <ResizablePanel defaultSize={50} minSize={20}>
                <div style={panelStyle}>Main Content</div>
              </ResizablePanel>
              <ResizablePanel defaultSize={25} minSize={15}>
                <div style={panelStyle}>Inspector</div>
              </ResizablePanel>
            </Resizable>
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Resizable Props</h2>
        <PropsTable props={resizableProps} />
      </div>

      <div className="section">
        <h2 className="section-title">ResizablePanel Props</h2>
        <PropsTable props={panelProps} />
      </div>

      <div className="section">
        <h2 className="section-title">ResizableHandle Props</h2>
        <PropsTable props={handleProps} />
      </div>
    </div>
  );
}
