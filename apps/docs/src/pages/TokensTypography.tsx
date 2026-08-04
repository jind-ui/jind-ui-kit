import { fontFamily, fontSize, fontWeight, lineHeight, typeVariants } from 'jind-ui-kit';
import { CodeBlock } from '../components/CodeBlock';

export function TokensTypography() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Typography</h1>
        <p className="page-description">
          Font families, sizes, weights, and pre-composed type variants.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Font Family</h2>
        <div className="type-row">
          <div style={{ fontFamily: fontFamily.sans, fontSize: 18 }}>
            DM Sans — The quick brown fox jumps over the lazy dog
          </div>
          <div className="type-meta">
            <span className="type-meta-item">fontFamily.sans</span>
          </div>
        </div>
        <div className="type-row">
          <div style={{ fontFamily: fontFamily.mono, fontSize: 16 }}>
            JetBrains Mono — const x = 42;
          </div>
          <div className="type-meta">
            <span className="type-meta-item">fontFamily.mono</span>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Font Size Scale</h2>
        {Object.entries(fontSize).map(([key, value]) => (
          <div className="type-row" key={key}>
            <div style={{ fontFamily: fontFamily.sans, fontSize: value }}>
              The quick brown fox — {value}px
            </div>
            <div className="type-meta">
              <span className="type-meta-item">fontSize[{key}]</span>
              <span className="type-meta-item">{value}px</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Font Weight</h2>
        {Object.entries(fontWeight).map(([key, value]) => (
          <div className="type-row" key={key}>
            <div style={{ fontFamily: fontFamily.sans, fontSize: 18, fontWeight: value }}>
              {key} ({value}) — The quick brown fox
            </div>
            <div className="type-meta">
              <span className="type-meta-item">fontWeight.{key}</span>
              <span className="type-meta-item">{value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Line Height</h2>
        {Object.entries(lineHeight).map(([key, value]) => (
          <div className="type-row" key={key}>
            <div style={{ fontFamily: fontFamily.sans, fontSize: 16, lineHeight: value }}>
              {key} ({value}) — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </div>
            <div className="type-meta">
              <span className="type-meta-item">lineHeight.{key}</span>
              <span className="type-meta-item">{value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Type Variants</h2>
        <p className="section-text">
          Pre-composed variants combine family, size, weight, and line-height
          into ready-to-use style objects.
        </p>
        {Object.entries(typeVariants).map(([key, style]) => (
          <div className="type-row" key={key}>
            <div style={style}>
              {key} — The quick brown fox jumps over the lazy dog
            </div>
            <div className="type-meta">
              <span className="type-meta-item">{style.fontSize}px</span>
              <span className="type-meta-item">weight {style.fontWeight}</span>
              <span className="type-meta-item">lh {style.lineHeight}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Usage</h2>
        <CodeBlock
          code={`
import { Text, Heading } from 'jind-ui-kit';

<Text variant="body">Body text</Text>
<Text variant="caption">Caption text</Text>
<Heading level={1}>Page title</Heading>
<Heading level={3}>Section heading</Heading>
`}
        />
      </div>
    </div>
  );
}
