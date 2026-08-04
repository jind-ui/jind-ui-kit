import { useTheme } from 'jind-ui-kit';

interface ViewMarkdownProps {
  slug: string;
}

export function ViewMarkdown({ slug }: ViewMarkdownProps) {
  const theme = useTheme();

  return (
    <a
      href={`/docs/${slug}.md`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: theme.fontFamily.sans,
        fontSize: theme.fontSize[13],
        color: theme.semantic.text.muted,
        textDecoration: 'none',
        float: 'right',
        marginTop: -4,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M2 2h8l4 4v8H2V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M5 9h6M5 11.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      View as Markdown
    </a>
  );
}
