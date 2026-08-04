import { radius, shadow, focusRing, duration, easing } from 'jind-ui-kit';
import { CodeBlock } from '../components/CodeBlock';

export function TokensElevation() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Elevation</h1>
        <p className="page-description">
          Border radius, shadows, focus rings, and motion tokens.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Border Radius</h2>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {Object.entries(radius).map(([key, value]) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: 'var(--brand-light)',
                  border: '2px solid var(--brand)',
                  borderRadius: value,
                }}
              />
              <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>
                {key}
              </div>
              <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--gray-400)' }}>
                {value}px
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Shadows</h2>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {Object.entries(shadow).filter(([k]) => k !== 'none').map(([key, value]) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 100,
                  height: 72,
                  background: 'white',
                  borderRadius: 10,
                  boxShadow: value,
                }}
              />
              <div style={{ marginTop: 10, fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>
                {key}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Focus Ring</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {Object.entries(focusRing).map(([key, value]) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 100,
                  height: 40,
                  background: 'white',
                  borderRadius: 8,
                  border: '1px solid var(--gray-300)',
                  boxShadow: value,
                }}
              />
              <div style={{ marginTop: 10, fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>
                {key}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Motion</h2>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {Object.entries(duration).map(([key, value]) => (
            <div key={key} style={{ fontSize: 14 }}>
              <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>duration.{key}</span>
              <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gray-400)' }}>
                {value}ms
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>easing.standard</span>
          <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gray-400)' }}>
            {easing.standard}
          </span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Usage</h2>
        <CodeBlock
          code={`
import { Box } from 'jind-ui-kit';

<Box radius="md" shadow="card" p={6}>
  Card with rounded corners and subtle shadow
</Box>

<Box radius="full" shadow="sm">
  Pill-shaped element
</Box>

// Direct token access
import { radius, shadow, duration } from 'jind-ui-kit';
radius.md        // 8
shadow.menu      // '0 8px 24px rgba(24, 39, 75, 0.10)'
duration.base    // 180
`}
        />
      </div>
    </div>
  );
}
