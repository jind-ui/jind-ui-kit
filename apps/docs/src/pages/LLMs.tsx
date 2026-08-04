import { CodeBlock } from '../components/CodeBlock';

export function LLMs() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">LLM Integration</h1>
        <p className="page-description">
          Machine-readable docs for AI assistants — Claude, GPT, Cursor, and other LLM-powered tools.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">What is llms.txt?</h2>
        <p className="section-text">
          Jind ships an <code>llms.txt</code> file — a structured plain-text
          document that gives LLMs the context they need to generate correct Jind code. It follows
          the llms.txt standard, a convention for making documentation AI-friendly.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Why it matters</h2>
        <p className="section-text">
          When you paste Jind's <code>llms.txt</code> into your AI assistant's
          context (or point it at the URL), it learns:
        </p>
        <ul className="section-text" style={{ paddingLeft: 24 }}>
          <li>Every component, its props, and its import path</li>
          <li>The theme system and how tokens work</li>
          <li>Important patterns (inline styles, no CSS, React 19, named exports)</li>
          <li>All available hooks and their signatures</li>
        </ul>
        <p className="section-text">
          This means the AI writes valid Jind code on the first try — correct imports, correct
          prop names, correct patterns.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Access</h2>
        <p className="section-text">
          The file is served at the root of the docs site:
        </p>
        <CodeBlock code="https://your-docs-domain.com/llms.txt" />
        <p className="section-text">
          Or locally when running the dev server:
        </p>
        <CodeBlock code="http://localhost:5173/llms.txt" />
      </div>

      <div className="section">
        <h2 className="section-title">Using with AI Tools</h2>

        <h3 className="section-title" style={{ fontSize: 16 }}>Claude / ChatGPT</h3>
        <p className="section-text">
          Paste the contents of <code>llms.txt</code> at the start of your
          conversation, or add it as a project file in Claude Projects.
        </p>

        <h3 className="section-title" style={{ fontSize: 16 }}>Cursor / Windsurf</h3>
        <p className="section-text">
          Add the file to your project root or reference it in your AI rules. Cursor
          will automatically include it in context when you ask about Jind components.
        </p>

        <h3 className="section-title" style={{ fontSize: 16 }}>Claude Code</h3>
        <p className="section-text">
          Add a reference to the file in your <code>CLAUDE.md</code>:
        </p>
        <CodeBlock code={`# CLAUDE.md
See llms.txt for the full Jind UI Kit API reference.`} />
      </div>

      <div className="section">
        <h2 className="section-title">What's included</h2>
        <p className="section-text">
          The <code>llms.txt</code> covers:
        </p>
        <ul className="section-text" style={{ paddingLeft: 24 }}>
          <li>Quick start and installation</li>
          <li>Complete component index with descriptions</li>
          <li>Theme system reference (colors, semantic tokens, spacing, radius, shadows)</li>
          <li>All hooks with their purpose</li>
          <li>Important patterns: inline styles, <code>useState</code> for interactions, polymorphic <code>as</code> prop, React 19 ref handling</li>
        </ul>
      </div>
    </div>
  );
}
