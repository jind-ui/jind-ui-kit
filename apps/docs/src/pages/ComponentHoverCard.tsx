import { HoverCard, Text } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const hoverCardProps = [
  { name: 'trigger', type: 'ReactNode', description: 'The element the user hovers over to reveal the card' },
  { name: 'children', type: 'ReactNode', description: 'Content rendered inside the hover card popup' },
  { name: 'side', type: "'top' | 'bottom'", default: "'bottom'", description: 'Which side of the trigger the card appears on' },
  { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Horizontal alignment of the card relative to the trigger' },
  { name: 'openDelay', type: 'number', default: '300', description: 'Milliseconds before the card opens on hover' },
  { name: 'closeDelay', type: 'number', default: '150', description: 'Milliseconds before the card closes when the mouse leaves' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles for the wrapper element' },
  { name: 'ref', type: 'Ref<HTMLDivElement>', description: 'Ref forwarded to the wrapper div' },
];

const linkStyle: React.CSSProperties = {
  textDecoration: 'underline',
  cursor: 'pointer',
  fontWeight: 500,
};

export function ComponentHoverCard() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="hover-card" />
        <h1 className="page-title">HoverCard</h1>
        <p className="page-description">
          A non-modal popup that appears when the user hovers over a trigger
          element. Useful for previewing linked content, profile cards, or
          supplementary information without navigating away.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Usage</h2>
        <Preview
          code={`<HoverCard trigger={<span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Hover me</span>}>
  <Text>This is a simple hover card with some helpful information.</Text>
</HoverCard>`}
        >
          <HoverCard trigger={<span style={linkStyle}>Hover me</span>}>
            <Text>This is a simple hover card with some helpful information.</Text>
          </HoverCard>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Content</h2>
        <Preview
          code={`<HoverCard
  trigger={<span style={{ textDecoration: 'underline', cursor: 'pointer' }}>@janedoe</span>}
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Text style={{ fontWeight: 600 }}>Jane Doe</Text>
    <Text>Senior Engineer at Acme Corp. Loves building UI kits and hiking on weekends.</Text>
    <Text style={{ opacity: 0.6, fontSize: 12 }}>Joined March 2023</Text>
  </div>
</HoverCard>`}
        >
          <HoverCard
            trigger={<span style={linkStyle}>@janedoe</span>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Text style={{ fontWeight: 600 }}>Jane Doe</Text>
              <Text>Senior Engineer at Acme Corp. Loves building UI kits and hiking on weekends.</Text>
              <Text style={{ opacity: 0.6, fontSize: 12 }}>Joined March 2023</Text>
            </div>
          </HoverCard>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Side and Align</h2>
        <Preview
          code={`<div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
  <HoverCard side="bottom" align="start" trigger={<span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Bottom Start</span>}>
    <Text>Aligned to the start, below the trigger.</Text>
  </HoverCard>
  <HoverCard side="top" align="center" trigger={<span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Top Center</span>}>
    <Text>Centered above the trigger.</Text>
  </HoverCard>
  <HoverCard side="bottom" align="end" trigger={<span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Bottom End</span>}>
    <Text>Aligned to the end, below the trigger.</Text>
  </HoverCard>
</div>`}
        >
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <HoverCard side="bottom" align="start" trigger={<span style={linkStyle}>Bottom Start</span>}>
              <Text>Aligned to the start, below the trigger.</Text>
            </HoverCard>
            <HoverCard side="top" align="center" trigger={<span style={linkStyle}>Top Center</span>}>
              <Text>Centered above the trigger.</Text>
            </HoverCard>
            <HoverCard side="bottom" align="end" trigger={<span style={linkStyle}>Bottom End</span>}>
              <Text>Aligned to the end, below the trigger.</Text>
            </HoverCard>
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={hoverCardProps} />
      </div>
    </div>
  );
}
