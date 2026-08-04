import { ScrollArea } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const scrollAreaProps = [
  { name: 'children', type: 'ReactNode', description: 'Scrollable content' },
  { name: 'maxHeight', type: 'number | string', description: 'Maximum height of the scroll container' },
  { name: 'orientation', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Which axes are scrollable' },
  { name: 'scrollbarSize', type: 'number', default: '8', description: 'Scrollbar track width in pixels' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
  { name: 'ref', type: 'Ref<HTMLDivElement>', description: 'Forwarded ref to the container element' },
];

export function ComponentScrollArea() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="scroll-area" />
        <h1 className="page-title">ScrollArea</h1>
        <p className="page-description">
          Custom-styled scrollable container with themed scrollbars that appear
          on hover. Supports vertical, horizontal, or bidirectional scrolling.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Vertical Scroll</h2>
        <Preview
          align="column"
          code={`<ScrollArea maxHeight={200}>
  <div style={{ padding: 16 }}>
    {Array.from({ length: 20 }, (_, i) => (
      <p key={i} style={{ margin: '8px 0' }}>
        Item {i + 1} — Scroll down to see more content
      </p>
    ))}
  </div>
</ScrollArea>`}
        >
          <ScrollArea maxHeight={200}>
            <div style={{ padding: 16 }}>
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} style={{ margin: '8px 0' }}>
                  Item {i + 1} — Scroll down to see more content
                </p>
              ))}
            </div>
          </ScrollArea>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Horizontal Scroll</h2>
        <Preview
          align="column"
          code={`<ScrollArea orientation="horizontal">
  <div style={{ display: 'flex', gap: 16, padding: 16, width: 1200 }}>
    {Array.from({ length: 10 }, (_, i) => (
      <div
        key={i}
        style={{
          minWidth: 160,
          height: 80,
          borderRadius: 8,
          background: 'var(--jind-surface-subtle, #f3f4f6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Card {i + 1}
      </div>
    ))}
  </div>
</ScrollArea>`}
        >
          <ScrollArea orientation="horizontal">
            <div style={{ display: 'flex', gap: 16, padding: 16, width: 1200 }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: 160,
                    height: 80,
                    borderRadius: 8,
                    background: 'var(--jind-surface-subtle, #f3f4f6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Card {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Height</h2>
        <Preview
          align="column"
          code={`<ScrollArea maxHeight={120} scrollbarSize={6}>
  <div style={{ padding: 16 }}>
    {Array.from({ length: 12 }, (_, i) => (
      <p key={i} style={{ margin: '6px 0' }}>
        Row {i + 1} — Compact scroll area with 6px scrollbar
      </p>
    ))}
  </div>
</ScrollArea>`}
        >
          <ScrollArea maxHeight={120} scrollbarSize={6}>
            <div style={{ padding: 16 }}>
              {Array.from({ length: 12 }, (_, i) => (
                <p key={i} style={{ margin: '6px 0' }}>
                  Row {i + 1} — Compact scroll area with 6px scrollbar
                </p>
              ))}
            </div>
          </ScrollArea>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={scrollAreaProps} />
      </div>
    </div>
  );
}
