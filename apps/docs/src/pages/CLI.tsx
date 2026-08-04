import { CodeBlock } from '../components/CodeBlock';

export function CLI() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">CLI</h1>
        <p className="page-description">
          Install individual components into your project — like shadcn/ui, but for Jind.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Why?</h2>
        <p className="section-text">
          The full <code>jind-ui-kit</code> package gives you everything at once.
          The CLI lets you copy only the components you need into your own source tree,
          so you can customize them freely without a build-time dependency.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Install</h2>
        <p className="section-text">
          No global install required. Run it with <code>npx</code>:
        </p>
        <CodeBlock code="npx jind-cli init" />
        <p className="section-text">
          This creates a <code>jind.json</code> config in your project root
          and sets up the output directory for components.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Add Components</h2>
        <p className="section-text">
          Install one or more components by name:
        </p>
        <CodeBlock code={`npx jind-cli add button
npx jind-cli add modal tabs accordion
npx jind-cli add input select combobox`} />
        <p className="section-text">
          Each component is copied into your configured output directory with its
          dependencies (hooks, utils, types) resolved automatically.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Commands</h2>
        <table className="props-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>init</code></td>
              <td>Initialize Jind in your project (creates jind.json)</td>
            </tr>
            <tr>
              <td><code>add &lt;name...&gt;</code></td>
              <td>Add one or more components to your project</td>
            </tr>
            <tr>
              <td><code>list</code></td>
              <td>List all available components in the registry</td>
            </tr>
            <tr>
              <td><code>diff &lt;name&gt;</code></td>
              <td>Compare your local version against the registry</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Example Workflow</h2>
        <CodeBlock code={`# 1. Initialize in your project
npx jind-cli init

# 2. See what's available
npx jind-cli list

# 3. Add the components you need
npx jind-cli add button input card modal

# 4. Check for updates later
npx jind-cli diff button`} />
      </div>

      <div className="section">
        <h2 className="section-title">Configuration</h2>
        <p className="section-text">
          The <code>jind.json</code> file controls where components are written:
        </p>
        <CodeBlock code={`{
  "outputDir": "src/components/ui",
  "typescript": true
}`} />
        <p className="section-text">
          Components land as plain source files in your codebase — edit them freely. They're yours.
        </p>
      </div>
    </div>
  );
}
