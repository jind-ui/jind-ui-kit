import { useState } from 'react';
import { useDisclosure, Box, Button, VStack, HStack, Text, Badge } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { CodeBlock } from '../components/CodeBlock';

const returns = [
  { name: 'isOpen', type: 'boolean', description: 'Current open state' },
  { name: 'onOpen', type: '() => void', description: 'Set state to open' },
  { name: 'onClose', type: '() => void', description: 'Set state to closed' },
  { name: 'onToggle', type: '() => void', description: 'Toggle between open and closed' },
];

function InteractiveDemo() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <VStack gap={4} style={{ width: 360, maxWidth: '100%' }}>
      <HStack gap={3} style={{ alignItems: 'center' }}>
        <Badge tone={isOpen ? 'green' : 'gray'} style={{ minWidth: 60, textAlign: 'center' }}>
          {isOpen ? 'Open' : 'Closed'}
        </Badge>
      </HStack>
      <HStack gap={2}>
        <Button size="sm" variant="primary" onClick={onOpen}>Open</Button>
        <Button size="sm" variant="secondary" onClick={onClose}>Close</Button>
        <Button size="sm" variant="secondary" onClick={onToggle}>Toggle</Button>
      </HStack>
      {isOpen && (
        <Box p={4} bg="#eff5ff" radius="md">
          <Text variant="body" color="#1a72f6">
            Panel is visible — managed by useDisclosure
          </Text>
        </Box>
      )}
    </VStack>
  );
}

export function HookDisclosure() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">useDisclosure</h1>
        <p className="page-description">
          Manages boolean open/close state with convenience handlers. Perfect
          for modals, drawers, tooltips, and expandable panels.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Interactive Demo</h2>
        <div className="preview-card">
          <div className="preview-area">
            <InteractiveDemo />
          </div>
          <CodeBlock code={`const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

// With initial state
const { isOpen } = useDisclosure(true); // starts open`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Return Values</h2>
        <PropsTable props={returns} />
      </div>

      <div className="section">
        <h2 className="section-title">Real-World Usage</h2>
        <CodeBlock code={`import { useDisclosure, Modal, Button } from 'jind-ui-kit';

function DeleteConfirm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="secondary" onClick={onOpen}>
        Delete Item
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
        <Text>Are you sure? This cannot be undone.</Text>
        <HStack gap={3}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleDelete}>Delete</Button>
        </HStack>
      </Modal>
    </>
  );
}`} />
      </div>
    </div>
  );
}
