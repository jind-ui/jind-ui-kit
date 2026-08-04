import { type ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';

interface PreviewProps {
  children: ReactNode;
  code: string;
  align?: 'center' | 'left' | 'column';
}

export function Preview({ children, code, align = 'center' }: PreviewProps) {
  const areaClass = [
    'preview-area',
    align === 'left' && 'preview-area-left',
    align === 'column' && 'preview-area-col',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="preview-card">
      <div className={areaClass}>{children}</div>
      <CodeBlock code={code} />
    </div>
  );
}
