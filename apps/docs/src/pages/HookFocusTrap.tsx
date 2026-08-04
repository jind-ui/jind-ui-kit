import { useRef } from 'react';
import { useFocusTrap, Box, Button, Input, Text, VStack, useTheme, useDisclosure } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const params = [
  { name: 'ref', type: 'RefObject<HTMLElement | null>', description: 'Ref to the container whose focusable children are trapped' },
  { name: 'enabled', type: 'boolean', default: 'true', description: 'Toggle the trap on or off' },
];

function FocusTrapDemo() {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, onToggle } = useDisclosure();

  useFocusTrap(ref, isOpen);

  return (
    <VStack gap={4} style={{ alignItems: 'center' }}>
      <Button variant="primary" size="sm" onClick={onToggle} style={{ minWidth: 170 }}>
        {isOpen ? 'Disable' : 'Enable'} Focus Trap
      </Button>
      <Box
        ref={ref}
        p={5}
        bg={theme.semantic.surface.card}
        radius="md"
        shadow="card"
        style={{ width: 300, maxWidth: '100%', border: isOpen ? `2px solid ${theme.semantic.fill.primary}` : `1px solid ${theme.semantic.border.default}` }}
      >
        <VStack gap={3}>
          <Text variant="caption" color={isOpen ? theme.semantic.fill.primary : theme.semantic.text.secondary}>
            {isOpen ? 'Focus is trapped — Tab cycles within' : 'Focus trap disabled'}
          </Text>
          <Input placeholder="First field" />
          <Input placeholder="Second field" />
          <Button variant="secondary" size="sm">Submit</Button>
        </VStack>
      </Box>
    </VStack>
  );
}

export function HookFocusTrap() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">useFocusTrap</h1>
        <p className="page-description">
          Traps keyboard focus inside a container so Tab and Shift+Tab cycle through
          its focusable children. Essential for accessible modals and dialogs.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Demo</h2>
        <p className="section-text">
          Enable the trap, then press Tab — focus stays inside the card.
        </p>
        <Preview
          code={`const ref = useRef<HTMLDivElement>(null);
const { isOpen, onToggle } = useDisclosure();

useFocusTrap(ref, isOpen);

return (
  <Box ref={ref} p={5} radius="md" shadow="card">
    <Input placeholder="First field" />
    <Input placeholder="Second field" />
    <Button size="sm">Submit</Button>
  </Box>
);`}
        >
          <FocusTrapDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Parameters</h2>
        <PropsTable props={params} />
      </div>
    </div>
  );
}
