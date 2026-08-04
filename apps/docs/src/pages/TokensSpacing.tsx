import { space, controlHeight, controlPadding } from 'jind-ui-kit';
import { CodeBlock } from '../components/CodeBlock';

export function TokensSpacing() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Spacing</h1>
        <p className="page-description">
          A consistent spacing scale, control heights, and padding tokens.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Space Scale</h2>
        <p className="section-text">
          12-step scale based on a 2px sub-grid. Use space tokens for padding,
          margin, and gap values across the UI.
        </p>
        {Object.entries(space).map(([step, px]) => (
          <div className="spacing-row" key={step}>
            <span className="spacing-label">space.{step}</span>
            <div className="spacing-bar" style={{ width: px * 4 }} />
            <span className="spacing-value">{px}px</span>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Control Heights</h2>
        <p className="section-text">
          Consistent heights for interactive controls — buttons, inputs, selects.
        </p>
        {Object.entries(controlHeight).map(([size, px]) => (
          <div className="spacing-row" key={size}>
            <span className="spacing-label">{size}</span>
            <div
              className="spacing-bar"
              style={{
                width: px * 3,
                height: px,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand)',
              }}
            >
              {px}px
            </div>
            <span className="spacing-value">{px}px</span>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Control Padding</h2>
        <p className="section-text">
          Horizontal padding values for different control types.
        </p>
        {Object.entries(controlPadding).map(([name, px]) => (
          <div className="spacing-row" key={name}>
            <span className="spacing-label">{name}</span>
            <div className="spacing-bar" style={{ width: px * 4 }} />
            <span className="spacing-value">{px}px</span>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Usage</h2>
        <CodeBlock
          code={`
import { Box, HStack } from 'jind-ui-kit';

// Space tokens map to the scale
<Box p={4} m={2}>         {/* p=8px, m=4px */}
  <HStack gap={3}>        {/* gap=6px */}
    <span>Item</span>
  </HStack>
</Box>

// Direct access
import { space, controlHeight } from 'jind-ui-kit';
space[8]           // 20
controlHeight.md   // 40
`}
        />
      </div>
    </div>
  );
}
