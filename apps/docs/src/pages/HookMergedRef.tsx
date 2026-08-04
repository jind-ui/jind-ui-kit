import { CodeBlock } from '../components/CodeBlock';
import { PropsTable } from '../components/PropsTable';

const params = [
  { name: '...refs', type: 'Ref<T>[]', description: 'Any number of refs (callback refs or RefObjects) to merge into one' },
];

const returns = [
  { name: 'mergedRef', type: '(node: T | null) => void', description: 'A single callback ref that forwards the node to all provided refs' },
];

export function HookMergedRef() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">useMergedRef</h1>
        <p className="page-description">
          Merges multiple refs into a single callback ref. Useful when a component
          needs to forward a ref while also keeping a local ref for internal logic.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Usage</h2>
        <div className="preview-card">
          <CodeBlock code={`import { useRef, forwardRef } from 'react';
import { useMergedRef } from 'jind-ui-kit';

const MyInput = forwardRef((props, forwardedRef) => {
  const localRef = useRef<HTMLInputElement>(null);
  const merged = useMergedRef(localRef, forwardedRef);

  const focusSelf = () => localRef.current?.focus();

  return <input ref={merged} {...props} />;
});`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Why</h2>
        <p className="section-text">
          React only allows a single ref per element. When you need both an internal
          ref (for measuring, focusing, etc.) and the consumer's forwarded ref, this
          hook combines them so both stay in sync.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Parameters</h2>
        <PropsTable props={params} />
      </div>

      <div className="section">
        <h2 className="section-title">Returns</h2>
        <PropsTable props={returns} />
      </div>
    </div>
  );
}
