interface CodeBlockProps {
  code: string;
}

function highlightJSX(raw: string): string {
  const tokens: string[] = [];
  const MARK = 'TKHOLDER';
  const markRe = new RegExp(`${MARK}_(\\d+)_${MARK}`, 'g');

  function ph(cls: string, text: string): string {
    const i = tokens.length;
    tokens.push(`<span class="${cls}">${text}</span>`);
    return `${MARK}_${i}_${MARK}`;
  }

  let s = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 1. Comments first
  s = s.replace(/(\/\/[^\n]*)/g, (_, c) => ph('cmt', c));

  // 2. Strings
  s = s.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    (m) => ph('str', m),
  );

  // 3. JSX tags
  s = s.replace(
    /(&lt;\/?)([\w.]+)/g,
    (_, bracket, tag) => {
      const isComp = tag[0] >= 'A' && tag[0] <= 'Z';
      return bracket + ph(isComp ? 'comp' : 'tag', tag);
    },
  );

  // 4. Attributes (word followed by = then a string placeholder or {)
  const attrRe = new RegExp(`([\\w-]+)(=${MARK}|=\\{)`, 'g');
  s = s.replace(attrRe, (_, attr, rest) => ph('attr', attr) + rest);

  // 5. Keywords — but NOT inside placeholders
  s = s.replace(
    /\b(import|from|export|const|let|var|function|return|interface|extends|default|as|if|else|new|typeof|void|async|await|true|false|null|undefined)\b/g,
    (kw) => ph('kw', kw),
  );

  // 6. Numbers
  s = s.replace(
    /(?<![.\w])(\d+(?:\.\d+)?)(?![\w])/g,
    (m) => {
      if (/^\d+$/.test(m) && parseInt(m) < tokens.length) return m;
      return ph('num', m);
    },
  );

  // Resolve all placeholders
  s = s.replace(markRe, (_, i) => tokens[parseInt(i)]);

  return s;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const trimmed = code.replace(/^\n/, '').replace(/\n\s*$/, '');
  return (
    <div className="preview-code">
      <pre dangerouslySetInnerHTML={{ __html: highlightJSX(trimmed) }} />
    </div>
  );
}
