import { colors, semanticColors } from 'jind-ui-kit';
import { CodeBlock } from '../components/CodeBlock';

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="color-swatch">
      <div className="color-swatch-fill" style={{ background: value }} />
      <div className="color-swatch-info">
        <div className="color-swatch-name">{name}</div>
        <div className="color-swatch-value">{value}</div>
      </div>
    </div>
  );
}

export function TokensColors() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Colors</h1>
        <p className="page-description">
          The complete color palette and semantic color aliases used across the
          design system.
        </p>
      </div>

      {Object.entries(colors).map(([rampName, ramp]) => (
        <div className="section" key={rampName}>
          <h2 className="section-title" style={{ textTransform: 'capitalize' }}>
            {rampName}
          </h2>
          <div className="color-grid">
            {Object.entries(ramp).map(([shade, value]) => (
              <Swatch key={shade} name={`${rampName}.${shade}`} value={value} />
            ))}
          </div>
        </div>
      ))}

      <div className="section">
        <h2 className="section-title">Semantic Colors</h2>
        <p className="section-text">
          Semantic aliases map to palette colors and provide consistent meaning
          across the UI. Use these instead of raw palette values.
        </p>
        {Object.entries(semanticColors).map(([group, values]) => (
          <div key={group} style={{ marginBottom: 24 }}>
            <h3 className="section-subtitle" style={{ textTransform: 'capitalize' }}>
              {group}
            </h3>
            <div className="color-grid">
              {Object.entries(values).map(([key, value]) => (
                <Swatch key={key} name={`${group}.${key}`} value={value} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Usage</h2>
        <CodeBlock
          code={`
import { colors, semanticColors } from 'jind-ui-kit';

// Direct palette access
colors.blue[500]  // '#1a72f6'
colors.gray[900]  // '#23262f'

// Semantic aliases (preferred)
semanticColors.text.primary    // '#23262f'
semanticColors.fill.primary    // '#1a72f6'
semanticColors.border.default  // '#e7e9eb'
`}
        />
      </div>
    </div>
  );
}
