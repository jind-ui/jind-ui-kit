import { useState } from 'react';
import { Button, Text, HStack, VStack, useTheme } from 'jind-ui-kit';
import { Motion, type MotionPreset } from 'jind-ui-kit/motion';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'show', type: 'boolean', required: true, description: 'Controls visibility and triggers enter/exit animations' },
  { name: 'preset', type: 'MotionPreset', default: "'fade'", description: 'Animation preset to use' },
  { name: 'duration', type: 'number', default: '0.2', description: 'Animation duration in seconds' },
  { name: 'delay', type: 'number', description: 'Delay before animation starts (seconds)' },
  { name: 'as', type: 'ElementType', default: "'div'", description: 'HTML element to render as' },
  { name: 'layout', type: 'boolean', default: 'false', description: 'Enable layout animations' },
  { name: 'onAnimationComplete', type: '() => void', description: 'Callback when animation finishes' },
  { name: 'style', type: 'CSSProperties', description: 'Additional inline styles' },
];

const allPresets: MotionPreset[] = [
  'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right',
  'scale', 'scale-fade', 'blur', 'blur-fade', 'rotate',
  'bounce', 'flip', 'zoom', 'collapse', 'pop',
];

function PresetShowcase() {
  const theme = useTheme();
  const [preset, setPreset] = useState<MotionPreset>('fade');
  const [show, setShow] = useState(true);

  return (
    <VStack gap={4}>
      <HStack gap={2} style={{ flexWrap: 'wrap' }}>
        {allPresets.map((p) => (
          <button
            key={p}
            onClick={() => { setPreset(p); setShow(false); setTimeout(() => setShow(true), 200); }}
            style={{
              padding: '4px 10px',
              fontSize: 12,
              fontFamily: theme.fontFamily.mono,
              borderRadius: theme.radius.sm,
              border: `1px solid ${preset === p ? theme.semantic.fill.primary : theme.semantic.border.subtle}`,
              background: preset === p ? theme.semantic.fill.primary : theme.semantic.surface.card,
              color: preset === p ? theme.semantic.text.inverse : theme.semantic.text.primary,
              cursor: 'pointer',
            }}
          >
            {p}
          </button>
        ))}
      </HStack>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
        borderRadius: theme.radius.md,
        border: `1px dashed ${theme.semantic.border.subtle}`,
        background: theme.semantic.surface.quiet,
      }}>
        <Motion show={show} preset={preset} duration={0.35}>
          <div style={{
            padding: '20px 32px',
            background: theme.semantic.fill.primary,
            color: theme.semantic.text.inverse,
            borderRadius: theme.radius.md,
            fontFamily: theme.fontFamily.mono,
            fontSize: 14,
          }}>
            {preset}
          </div>
        </Motion>
      </div>

      <HStack gap={2} style={{ justifyContent: 'center' }}>
        <Button size="sm" variant="secondary" onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
        <Button size="sm" variant="primary" onClick={() => { setShow(false); setTimeout(() => setShow(true), 300); }}>
          Replay
        </Button>
      </HStack>
    </VStack>
  );
}

function DelayDemo() {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  return (
    <VStack gap={4}>
      <Button size="sm" variant="primary" onClick={() => setShow(!show)}>
        {show ? 'Hide All' : 'Show Staggered'}
      </Button>
      <HStack gap={3} style={{ justifyContent: 'center', minHeight: 60 }}>
        {[0, 0.1, 0.2, 0.3, 0.4].map((d, i) => (
          <Motion key={i} show={show} preset="scale-fade" delay={d} duration={0.3}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: theme.radius.sm,
              background: theme.semantic.fill.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.semantic.text.inverse,
              fontWeight: 600,
              fontSize: 14,
            }}>
              {i + 1}
            </div>
          </Motion>
        ))}
      </HStack>
    </VStack>
  );
}

function CollapseDemo() {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  return (
    <VStack gap={3}>
      <Button size="sm" variant="secondary" onClick={() => setShow(!show)}>
        {show ? 'Collapse' : 'Expand'} Content
      </Button>
      <Motion show={show} preset="collapse" duration={0.3}>
        <div style={{
          padding: 16,
          background: theme.semantic.surface.subtle,
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.semantic.border.subtle}`,
        }}>
          <Text>This content smoothly collapses and expands using the <code>collapse</code> preset.
            It animates height from 0 to auto with overflow hidden.</Text>
        </div>
      </Motion>
    </VStack>
  );
}

export function ComponentMotion() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="motion" />
        <h1 className="page-title">Motion</h1>
        <p className="page-description">
          Declarative enter/exit animations with 15 built-in presets.
          Powered by Framer Motion with a simplified API.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Preset Showcase</h2>
        <p className="section-text">
          Click any preset to see it in action. Each preset defines enter, exit,
          and transition behavior.
        </p>
        <Preview
          code={`<Motion show={visible} preset="scale-fade" duration={0.35}>
  <div>Animated content</div>
</Motion>`}
        >
          <PresetShowcase />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Staggered Entry</h2>
        <p className="section-text">
          Use the <code>delay</code> prop to stagger multiple elements
          entering at different times.
        </p>
        <Preview
          code={`{items.map((item, i) => (
  <Motion
    show={show}
    preset="scale-fade"
    delay={i * 0.1}
    duration={0.3}
  >
    <Card>{item}</Card>
  </Motion>
))}`}
        >
          <DelayDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Collapse</h2>
        <p className="section-text">
          The <code>collapse</code> preset animates height for expandable sections.
        </p>
        <Preview
          code={`<Motion show={expanded} preset="collapse" duration={0.3}>
  <div>Collapsible content here</div>
</Motion>`}
        >
          <CollapseDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Available Presets</h2>
        <table className="props-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Preset</th>
              <th>Description</th>
              <th>Physics</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>fade</code></td><td>Simple opacity fade</td><td>Ease</td></tr>
            <tr><td><code>slide-up</code></td><td>Fade + slide from below</td><td>Ease</td></tr>
            <tr><td><code>slide-down</code></td><td>Fade + slide from above</td><td>Ease</td></tr>
            <tr><td><code>slide-left</code></td><td>Fade + slide from right</td><td>Ease</td></tr>
            <tr><td><code>slide-right</code></td><td>Fade + slide from left</td><td>Ease</td></tr>
            <tr><td><code>scale</code></td><td>Fade + scale from 0.9</td><td>Ease</td></tr>
            <tr><td><code>scale-fade</code></td><td>Fade + scale + slight slide</td><td>Ease</td></tr>
            <tr><td><code>blur</code></td><td>Fade + blur in/out</td><td>Ease</td></tr>
            <tr><td><code>blur-fade</code></td><td>Fade + blur + slide</td><td>Ease</td></tr>
            <tr><td><code>rotate</code></td><td>Fade + slight rotation + scale</td><td>Ease</td></tr>
            <tr><td><code>bounce</code></td><td>Spring-based drop from above</td><td>Spring</td></tr>
            <tr><td><code>flip</code></td><td>3D flip on X axis</td><td>Ease</td></tr>
            <tr><td><code>zoom</code></td><td>Spring scale from 0</td><td>Spring</td></tr>
            <tr><td><code>collapse</code></td><td>Height 0 → auto with overflow</td><td>Ease</td></tr>
            <tr><td><code>pop</code></td><td>Snappy spring from small scale</td><td>Spring</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
