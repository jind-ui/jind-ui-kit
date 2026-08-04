import { ButtonGroup, Button } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

function WarningIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5.5V9M8 11V11.01M3.07 14H12.93C14.07 14 14.78 12.77 14.21 11.8L9.28 3.18C8.71 2.21 7.29 2.21 6.72 3.18L1.79 11.8C1.22 12.77 1.93 14 3.07 14Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 6.5L8 2L13.5 6.5V13C13.5 13.28 13.28 13.5 13 13.5H3C2.72 13.5 2.5 13.28 2.5 13V6.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 13.5V9H10V13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const props = [
  { name: 'children', type: 'ReactNode', description: 'Button elements to group together' },
  { name: 'size', type: "'sm' | 'md'", description: 'Override size for all buttons in the group' },
  { name: 'variant', type: "'primary' | 'secondary'", description: 'Override variant for all buttons' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Layout direction (default: horizontal)' },
  { name: 'attached', type: 'boolean', description: 'Connect buttons with shared borders (default: true)' },
  { name: 'divider', type: 'boolean', default: 'false', description: 'Show a border line between buttons when attached' },
  { name: 'dividerStyle', type: 'CSSProperties', description: 'Override divider appearance (color, width, etc.)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentButtonGroup() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="button-group" />
        <h1 className="page-title">ButtonGroup</h1>
        <p className="page-description">
          Groups related buttons together with connected borders and
          consistent sizing. Supports horizontal and vertical orientation.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Attached (Default)</h2>
        <Preview
          code={`<ButtonGroup>
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Center</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>`}
        >
          <ButtonGroup>
            <Button variant="secondary">Left</Button>
            <Button variant="secondary">Center</Button>
            <Button variant="secondary">Right</Button>
          </ButtonGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Detached</h2>
        <Preview
          code={`<ButtonGroup attached={false}>
  <Button variant="secondary">One</Button>
  <Button variant="secondary">Two</Button>
  <Button variant="secondary">Three</Button>
</ButtonGroup>`}
        >
          <ButtonGroup attached={false}>
            <Button variant="secondary">One</Button>
            <Button variant="secondary">Two</Button>
            <Button variant="secondary">Three</Button>
          </ButtonGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Size Override</h2>
        <Preview
          code={`<ButtonGroup size="sm">
  <Button variant="secondary">Small A</Button>
  <Button variant="secondary">Small B</Button>
</ButtonGroup>`}
        >
          <ButtonGroup size="sm">
            <Button variant="secondary">Small A</Button>
            <Button variant="secondary">Small B</Button>
          </ButtonGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Divider</h2>
        <p className="section-text">
          Use <code>divider</code> to add a theme-colored border line between attached buttons.
        </p>
        <Preview
          code={`<ButtonGroup divider>
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Center</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>`}
        >
          <ButtonGroup divider>
            <Button variant="secondary">Left</Button>
            <Button variant="secondary">Center</Button>
            <Button variant="secondary">Right</Button>
          </ButtonGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Icons</h2>
        <p className="section-text">
          Buttons in a group can use <code>iconLeft</code> and <code>iconRight</code> for richer actions.
        </p>
        <Preview
          code={`<ButtonGroup divider>
  <Button variant="secondary" iconLeft={<WarningIcon />}>Errors</Button>
  <Button variant="secondary" iconLeft={<HomeIcon />}>Home</Button>
  <Button variant="secondary" iconLeft={<WarningIcon />}>Warnings</Button>
</ButtonGroup>`}
        >
          <ButtonGroup divider>
            <Button variant="secondary" iconLeft={<WarningIcon />}>Errors</Button>
            <Button variant="secondary" iconLeft={<HomeIcon />}>Home</Button>
            <Button variant="secondary" iconLeft={<WarningIcon />}>Warnings</Button>
          </ButtonGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Divider</h2>
        <p className="section-text">
          Override the divider appearance with <code>dividerStyle</code>.
        </p>
        <Preview
          code={`<ButtonGroup divider dividerStyle={{ background: '#3b82f6', width: 2 }}>
  <Button variant="secondary">One</Button>
  <Button variant="secondary">Two</Button>
  <Button variant="secondary">Three</Button>
</ButtonGroup>`}
        >
          <ButtonGroup divider dividerStyle={{ background: '#3b82f6', width: 2 }}>
            <Button variant="secondary">One</Button>
            <Button variant="secondary">Two</Button>
            <Button variant="secondary">Three</Button>
          </ButtonGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Vertical with Divider</h2>
        <Preview
          code={`<ButtonGroup orientation="vertical" divider>
  <Button variant="secondary">Top</Button>
  <Button variant="secondary">Middle</Button>
  <Button variant="secondary">Bottom</Button>
</ButtonGroup>`}
        >
          <ButtonGroup orientation="vertical" divider>
            <Button variant="secondary">Top</Button>
            <Button variant="secondary">Middle</Button>
            <Button variant="secondary">Bottom</Button>
          </ButtonGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Vertical</h2>
        <Preview
          code={`<ButtonGroup orientation="vertical">
  <Button variant="secondary">Top</Button>
  <Button variant="secondary">Middle</Button>
  <Button variant="secondary">Bottom</Button>
</ButtonGroup>`}
        >
          <ButtonGroup orientation="vertical">
            <Button variant="secondary">Top</Button>
            <Button variant="secondary">Middle</Button>
            <Button variant="secondary">Bottom</Button>
          </ButtonGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
