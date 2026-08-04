#!/usr/bin/env node

/**
 * Generates llms.txt and per-component .md files for LLM consumption.
 * Reads from registry.json + source types to produce structured markdown.
 *
 * Output:
 *   apps/docs/public/llms.txt        — master index
 *   apps/docs/public/docs/*.md       — per-component markdown
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const REGISTRY_PATH = join(__dirname, '..', 'registry', 'registry.json');
const SRC = join(__dirname, '..', 'src');
const DOCS_PUBLIC = join(ROOT, 'apps', 'docs', 'public');
const DOCS_DIR = join(DOCS_PUBLIC, 'docs');

mkdirSync(DOCS_DIR, { recursive: true });

const registry = JSON.parse(readFileSync(REGISTRY_PATH, 'utf8'));

// Extract type info from source files
function extractProps(componentDir) {
  const mainFile = join(SRC, componentDir);
  if (!existsSync(mainFile)) return [];

  const content = readFileSync(mainFile, 'utf8');
  const props = [];
  const propRegex = /^\s+(\w+)\??:\s*(.+?);/gm;
  const interfaceMatch = content.match(/export interface \w+Props[^{]*\{([^}]+)\}/s);
  if (interfaceMatch) {
    let m;
    while ((m = propRegex.exec(interfaceMatch[1])) !== null) {
      const [, name, type] = m;
      if (name === 'ref' || name === 'style') continue;
      props.push({ name, type: type.trim() });
    }
  }
  return props;
}

function extractExports(indexFile) {
  if (!existsSync(indexFile)) return { components: [], types: [] };
  const content = readFileSync(indexFile, 'utf8');
  const components = [];
  const types = [];

  const compMatch = content.matchAll(/export\s*\{\s*([^}]+)\}\s*from/g);
  for (const m of compMatch) {
    components.push(...m[1].split(',').map(s => s.trim()).filter(Boolean));
  }

  const typeMatch = content.matchAll(/export\s+type\s*\{\s*([^}]+)\}\s*from/g);
  for (const m of typeMatch) {
    types.push(...m[1].split(',').map(s => s.trim()).filter(Boolean));
  }

  return { components, types };
}

// Build per-component markdown
const componentDocs = [];

for (const comp of registry.components) {
  const mainFilePath = comp.files[0]?.path;
  if (!mainFilePath) continue;

  const props = extractProps(mainFilePath);
  const slug = comp.slug;
  const indexPath = join(SRC, `components/${comp.name}/index.ts`);
  const { components: exports, types } = extractExports(indexPath);

  let md = `# ${comp.name}\n\n`;
  md += `${comp.description}\n\n`;
  md += `**Category:** ${comp.category}\n\n`;

  if (exports.length > 0) {
    md += `## Import\n\n`;
    md += `\`\`\`tsx\nimport { ${exports.join(', ')} } from 'tinda-ui-kit';\n`;
    if (types.length > 0) {
      md += `import type { ${types.join(', ')} } from 'tinda-ui-kit';\n`;
    }
    md += `\`\`\`\n\n`;
  }

  if (props.length > 0) {
    md += `## Props\n\n`;
    md += `| Prop | Type |\n|------|------|\n`;
    for (const p of props) {
      md += `| \`${p.name}\` | \`${p.type.replace(/\|/g, '\\|')}\` |\n`;
    }
    md += `\n`;
  }

  if (comp.registryDependencies?.length > 0) {
    md += `## Dependencies\n\n`;
    md += comp.registryDependencies.map(d => `- ${d}`).join('\n') + '\n\n';
  }

  if (comp.npmDependencies && Object.keys(comp.npmDependencies).length > 0) {
    md += `## NPM Dependencies\n\n`;
    for (const [pkg, ver] of Object.entries(comp.npmDependencies)) {
      md += `- \`${pkg}@${ver}\`\n`;
    }
    md += '\n';
  }

  const mdPath = join(DOCS_DIR, `${slug}.md`);
  writeFileSync(mdPath, md);
  componentDocs.push({ name: comp.name, slug, description: comp.description, category: comp.category });
}

// Generate hook docs
const hooksDir = join(SRC, 'hooks');
const hookFiles = existsSync(hooksDir) ? readdirSync(hooksDir).filter(f => f.startsWith('use') && f.endsWith('.ts')) : [];

const hookDocs = [];
for (const file of hookFiles) {
  const content = readFileSync(join(hooksDir, file), 'utf8');
  const name = file.replace('.ts', '');
  const slug = name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');

  let md = `# ${name}\n\n`;

  const interfaceMatch = content.match(/export interface (\w+Options)[^{]*\{([^}]+)\}/s);
  if (interfaceMatch) {
    md += `## Options\n\n`;
    md += `| Option | Type |\n|--------|------|\n`;
    const propRegex = /^\s+(\w+)\??:\s*(.+?);/gm;
    let m;
    while ((m = propRegex.exec(interfaceMatch[2])) !== null) {
      md += `| \`${m[1]}\` | \`${m[2].trim().replace(/\|/g, '\\|')}\` |\n`;
    }
    md += '\n';
  }

  const returnMatch = content.match(/export interface (\w+Return)[^{]*\{([^}]+)\}/s);
  if (returnMatch) {
    md += `## Returns\n\n`;
    md += `| Property | Type |\n|----------|------|\n`;
    const propRegex = /^\s+(\w+)\??:\s*(.+?);/gm;
    let m;
    while ((m = propRegex.exec(returnMatch[2])) !== null) {
      md += `| \`${m[1]}\` | \`${m[2].trim().replace(/\|/g, '\\|')}\` |\n`;
    }
    md += '\n';
  }

  md += `## Import\n\n\`\`\`tsx\nimport { ${name} } from 'tinda-ui-kit';\n\`\`\`\n`;

  const mdPath = join(DOCS_DIR, `${slug}.md`);
  writeFileSync(mdPath, md);
  hookDocs.push({ name, slug });
}

// Build llms.txt
const BASE_URL = 'https://tinda.dev';

let llms = `# Tinda UI Kit

Tinda UI Kit is a TypeScript React component library with inline styles and design tokens.
It uses a token-based theme system (not Tailwind CSS), Zustand for theme state, and supports
both web (\`tinda-ui-kit\`) and React Native (\`tinda-ui-kit-native\`).

Key features:
- 64+ components, 11 hooks, 4 built-in themes
- Zero-dependency (except optional \`motion/react\` for the Motion component)
- React 19 patterns (ref-as-prop, no forwardRef)
- Named exports only — no default exports
- Polymorphic \`as\` prop on key components
- CLI tool (\`tinda-cli\`) for selective component installation

## Install

\`\`\`bash
npm install tinda-ui-kit
\`\`\`

## Quick Start

\`\`\`tsx
import { TindaProvider, Button, Text } from 'tinda-ui-kit';

function App() {
  return (
    <TindaProvider>
      <Text variant="body">Hello Tinda</Text>
      <Button variant="primary">Click me</Button>
    </TindaProvider>
  );
}
\`\`\`

## Theme

The theme is accessed via \`useTheme()\` and contains:
- \`theme.colors\` — color ramps (gray, blue, red, green, amber, teal, purple)
- \`theme.semantic\` — semantic tokens (text, fill, surface, border, icon)
- \`theme.space\` — spacing scale
- \`theme.radius\` — border radius tokens (xs, sm, md, lg, xl, full)
- \`theme.shadow\` — elevation shadows
- \`theme.fontSize\`, \`theme.fontWeight\`, \`theme.fontFamily\` — typography
- \`theme.duration\`, \`theme.easing\` — animation timing

## Components

`;

const categories = {};
for (const doc of componentDocs) {
  if (!categories[doc.category]) categories[doc.category] = [];
  categories[doc.category].push(doc);
}

for (const [cat, docs] of Object.entries(categories).sort()) {
  llms += `### ${cat.charAt(0).toUpperCase() + cat.slice(1)}\n\n`;
  for (const doc of docs.sort((a, b) => a.name.localeCompare(b.name))) {
    llms += `- [${doc.name}](${BASE_URL}/docs/${doc.slug}.md): ${doc.description}\n`;
  }
  llms += '\n';
}

if (hookDocs.length > 0) {
  llms += `## Hooks\n\n`;
  for (const doc of hookDocs.sort((a, b) => a.name.localeCompare(b.name))) {
    llms += `- [${doc.name}](${BASE_URL}/docs/${doc.slug}.md)\n`;
  }
  llms += '\n';
}

llms += `## Theming

- Themes are JS objects, not CSS variables
- Switch themes at runtime: \`useThemeStore().setTheme('neon')\`
- Access tokens: \`const theme = useTheme()\`
- Sub-theme nesting: \`<ThemeOverride overrides={{...}}>\`
- Color ramps: gray, blue, red, green, amber, teal, purple
- Sparse ramps: blue has 50, 100, 200, 500, 600, 700 (no 300/400)
- Use \`theme.colors\` (not \`theme.color\`)

## Important Patterns

- All styles are inline (no CSS classes, no Tailwind)
- Hover/active states use \`useState\` + mouse event handlers
- Components accept \`style\` prop for overrides via \`mergeStyles()\`
- No \`forwardRef\` — use \`ref\` as a regular prop (React 19)
- Named exports only: \`export function Button\`, never \`export default\`
`;

writeFileSync(join(DOCS_PUBLIC, 'llms.txt'), llms);

console.log(`Generated llms.txt (${llms.length} bytes)`);
console.log(`Generated ${componentDocs.length} component docs`);
console.log(`Generated ${hookDocs.length} hook docs`);
