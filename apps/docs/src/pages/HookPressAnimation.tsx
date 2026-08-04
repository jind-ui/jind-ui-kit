import { useState } from 'react';
import { usePressAnimation, Text, HStack, VStack, useTheme, type PressEffect } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const options = [
  { name: 'effect', type: "'scale' | 'shift' | 'glow' | 'none'", default: "'scale'", description: 'Type of press feedback animation' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable press animation' },
];

const returns = [
  { name: 'pressed', type: 'boolean', description: 'Whether the element is currently pressed' },
  { name: 'pressProps', type: '{ onMouseDown, onMouseUp, onMouseLeave }', description: 'Spread onto your interactive element' },
  { name: 'pressStyle', type: 'CSSProperties', description: 'Merge into your element\'s style' },
];

function PressEffectDemo() {
  const theme = useTheme();
  const effects: PressEffect[] = ['scale', 'shift', 'glow', 'none'];
  const [active, setActive] = useState<PressEffect>('scale');

  const scale = usePressAnimation({ effect: 'scale' });
  const shift = usePressAnimation({ effect: 'shift' });
  const glow = usePressAnimation({ effect: 'glow' });
  const none = usePressAnimation({ effect: 'none' });
  const hooks = { scale, shift, glow, none };

  return (
    <VStack gap={4}>
      <HStack gap={3} style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {effects.map((effect) => {
          const hook = hooks[effect];
          return (
            <div
              key={effect}
              {...hook.pressProps}
              style={{
                padding: '16px 28px',
                borderRadius: theme.radius.md,
                border: `2px solid ${active === effect ? theme.semantic.fill.primary : theme.semantic.border.subtle}`,
                background: theme.semantic.surface.card,
                cursor: 'pointer',
                userSelect: 'none',
                textAlign: 'center',
                minWidth: 100,
                ...hook.pressStyle,
              }}
              onClick={() => setActive(effect)}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Text weight={700}>{effect}</Text>
                <Text variant="caption" color={theme.semantic.text.secondary}>
                  {hook.pressed ? 'Pressed!' : 'Press me'}
                </Text>
              </div>
            </div>
          );
        })}
      </HStack>
    </VStack>
  );
}

function CustomComponentDemo() {
  const theme = useTheme();
  const { pressProps, pressStyle } = usePressAnimation({ effect: 'scale' });

  return (
    <div
      {...pressProps}
      style={{
        padding: 20,
        borderRadius: theme.radius.lg,
        background: `linear-gradient(135deg, ${theme.semantic.fill.primary}, ${theme.semantic.fill.primaryHover})`,
        color: '#fff',
        cursor: 'pointer',
        userSelect: 'none',
        textAlign: 'center',
        maxWidth: 300,
        ...pressStyle,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Text weight={700} style={{ color: '#fff' }}>Custom Card</Text>
        <Text variant="caption" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Press animation on any element
        </Text>
      </div>
    </div>
  );
}

export function HookPressAnimation() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">usePressAnimation</h1>
        <p className="page-description">
          Add tactile press feedback to any element. Returns event handlers and
          animated styles — spread them onto your component.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Press Effects</h2>
        <p className="section-text">
          Four effects available: <code>scale</code> shrinks slightly,{' '}
          <code>shift</code> moves down 1px, <code>glow</code> adds a ring,
          and <code>none</code> disables feedback. Press each card to see the effect.
        </p>
        <Preview
          code={`const { pressProps, pressStyle } = usePressAnimation({
  effect: 'scale',
});

return (
  <div {...pressProps} style={{ ...baseStyle, ...pressStyle }}>
    Press me
  </div>
);`}
        >
          <PressEffectDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Component</h2>
        <p className="section-text">
          Use the hook to add press feedback to any custom component —
          cards, list items, or custom buttons.
        </p>
        <Preview
          code={`const { pressProps, pressStyle } = usePressAnimation({
  effect: 'scale',
});

return (
  <div {...pressProps} style={{ ...cardStyle, ...pressStyle }}>
    <Text>Custom Card</Text>
  </div>
);`}
        >
          <CustomComponentDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Options</h2>
        <PropsTable props={options} />
      </div>

      <div className="section">
        <h2 className="section-title">Returns</h2>
        <PropsTable props={returns} />
      </div>
    </div>
  );
}
