import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = join(__dirname, '..');
const COMPONENTS_DIR = join(PKG_ROOT, 'src', 'components');
const REGISTRY_DIR = join(PKG_ROOT, 'registry');

// ---------------------------------------------------------------------------
// Category mapping
// ---------------------------------------------------------------------------

const CATEGORY_MAP = {
  Button: 'buttons',
  IconButton: 'buttons',
  TextButton: 'buttons',
  ButtonGroup: 'buttons',
  Input: 'forms',
  Textarea: 'forms',
  Select: 'forms',
  Checkbox: 'forms',
  Radio: 'forms',
  Switch: 'forms',
  Slider: 'forms',
  SearchInput: 'forms',
  TagsInput: 'forms',
  DateInput: 'forms',
  FileUploader: 'forms',
  Field: 'forms',
  Badge: 'data-display',
  Chip: 'data-display',
  Card: 'data-display',
  Avatar: 'data-display',
  StatusDot: 'data-display',
  Skeleton: 'data-display',
  ProgressStat: 'data-display',
  Table: 'data-display',
  Modal: 'overlay',
  Tooltip: 'overlay',
  Popover: 'overlay',
  Drawer: 'overlay',
  Toast: 'overlay',
  Banner: 'overlay',
  Menu: 'overlay',
  CommandMenu: 'overlay',
  Tabs: 'navigation',
  Accordion: 'navigation',
  Breadcrumbs: 'navigation',
  Pagination: 'navigation',
  Stepper: 'navigation',
  Carousel: 'content',
  TreeView: 'content',
  Spinner: 'feedback',
  InteractionGroup: 'interaction',
  DayToggle: 'interaction',
  Motion: 'animation',
  Icon: 'utility',
  Calendar: 'utility',
  Toolbar: 'utility',
  ToolbarButton: 'utility',
  MenuItem: 'utility',
  Alert: 'feedback',
  AlertDialog: 'overlay',
  Collapsible: 'layout',
  Kbd: 'data-display',
  Combobox: 'forms',
  InputOTP: 'forms',
  InputGroup: 'forms',
  NativeSelect: 'forms',
  NavigationMenu: 'navigation',
  ContextMenu: 'overlay',
  HoverCard: 'overlay',
  EmptyState: 'feedback',
  ScrollArea: 'layout',
  Resizable: 'layout',
  Sidebar: 'navigation',
  DataTable: 'data-display',
};

// ---------------------------------------------------------------------------
// Description mapping
// ---------------------------------------------------------------------------

const DESCRIPTION_MAP = {
  Button: 'Polymorphic button with variant, size, loading, and icon support',
  IconButton: 'Icon-only button with tooltip support',
  TextButton: 'Minimal text-style button for inline actions',
  ButtonGroup: 'Groups buttons with connected or spaced layout',
  Input: 'Text input field with label, error, and helper text',
  Textarea: 'Multi-line text input with auto-resize',
  Select: 'Dropdown select with custom styling',
  Checkbox: 'Checkbox with label and indeterminate state',
  Radio: 'Radio button group for single selection',
  Switch: 'Toggle switch for boolean values',
  Slider: 'Range slider with label and value display',
  SearchInput: 'Search input with icon and clear button',
  TagsInput: 'Multi-value tag input with keyboard support',
  DateInput: 'Date picker with calendar dropdown',
  FileUploader: 'Drag-and-drop file upload zone with progress',
  Field: 'Form field wrapper with label and validation',
  Badge: 'Status badge with color variants',
  Chip: 'Compact element for tags, filters, or selections',
  Card: 'Container card with header, body, and footer slots',
  Avatar: 'User avatar with image, initials, or icon fallback',
  StatusDot: 'Small colored dot for status indication',
  Skeleton: 'Loading placeholder with pulse animation',
  ProgressStat: 'Progress bar with label and percentage',
  Table: 'Data table with sorting and row selection',
  Modal: 'Dialog overlay with focus trap and backdrop',
  Tooltip: 'Floating tooltip on hover or focus',
  Popover: 'Floating content panel triggered by click',
  Drawer: 'Slide-out panel from screen edge',
  Toast: 'Temporary notification messages',
  Banner: 'Full-width notification banner with variants',
  Menu: 'Dropdown menu with items and dividers',
  CommandMenu: 'Command palette (Cmd+K) with search and keyboard nav',
  Tabs: 'Tabbed navigation with panel content',
  Accordion: 'Expandable/collapsible content sections',
  Breadcrumbs: 'Navigation breadcrumb trail',
  Pagination: 'Page navigation with numbered pages',
  Stepper: 'Multi-step progress indicator',
  Carousel: 'Horizontal content slider with arrows and dots',
  TreeView: 'Hierarchical tree with expand/collapse and selection',
  Spinner: 'Loading spinner with size variants',
  InteractionGroup: 'Groups children to share interaction state',
  DayToggle: 'Day-of-week toggle selector',
  Motion: 'Animation wrapper using Framer Motion',
  Icon: 'SVG icon renderer',
  Calendar: 'Calendar grid for date picking',
  Toolbar: 'Horizontal toolbar container',
  ToolbarButton: 'Button styled for toolbar use',
  MenuItem: 'Individual menu item component',
  Alert: 'Inline notification block with tone variants and dismiss',
  AlertDialog: 'Confirmation dialog with cancel and confirm actions',
  Collapsible: 'Expand/collapse container primitive with animation',
  Kbd: 'Keyboard shortcut display badge',
  Combobox: 'Searchable select with autocomplete and keyboard nav',
  InputOTP: 'One-time password input with individual cells',
  InputGroup: 'Input with prefix/suffix addons and inline elements',
  NativeSelect: 'Browser-native select with custom styling',
  NavigationMenu: 'Horizontal nav bar with dropdown submenus',
  ContextMenu: 'Right-click context menu with Portal rendering',
  HoverCard: 'Rich content card appearing on hover',
  EmptyState: 'Placeholder for empty content areas',
  ScrollArea: 'Custom styled scrollbar wrapper',
  Resizable: 'Resizable split pane panels with drag handle',
  Sidebar: 'App layout sidebar with sections and collapse',
  DataTable: 'Enhanced table with sorting, filtering, and pagination',
};

// ---------------------------------------------------------------------------
// Peer/internal packages to exclude from npmDependencies
// ---------------------------------------------------------------------------

const PEER_AND_INTERNAL = new Set(['react', 'react-dom', 'react/jsx-runtime']);

// ---------------------------------------------------------------------------
// Import rewriting
// ---------------------------------------------------------------------------

/**
 * Internal import patterns that should be rewritten to `tinda-ui-kit`.
 * The `../../utils/styles` imports go to `tinda-ui-kit/styles` because those
 * utilities are NOT re-exported from the root barrel.
 */
const INTERNAL_REWRITE_RULES = [
  { pattern: /^\.\.\/\.\.\/utils\/styles$/, target: 'tinda-ui-kit/styles' },
  { pattern: /^\.\.\/\.\.\/utils\/responsive$/, target: 'tinda-ui-kit/styles' },
  { pattern: /^\.\.\/\.\.\/theme\/.*$/, target: 'tinda-ui-kit' },
  { pattern: /^\.\.\/\.\.\/primitives\/.*$/, target: 'tinda-ui-kit' },
  { pattern: /^\.\.\/\.\.\/hooks\/.*$/, target: 'tinda-ui-kit' },
  { pattern: /^\.\.\/\.\.\/tokens.*$/, target: 'tinda-ui-kit' },
  { pattern: /^\.\.\/\.\.\/types$/, target: 'tinda-ui-kit' },
];

/**
 * Match a cross-component import like `../Button/Button` or `../MenuItem/MenuItem`.
 * Returns the component name (e.g. "Button") or null.
 */
function crossComponentName(specifier) {
  const m = specifier.match(/^\.\.\/([A-Z][A-Za-z0-9]*)\/\1$/);
  return m ? m[1] : null;
}

/**
 * Convert a component name to its slug form.
 * E.g. "ButtonGroup" -> "button-group", "IconButton" -> "icon-button".
 */
function toSlug(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Parse all import statements from a source file.
 * Returns an array of { full, specifiers, from, isType }.
 */
function parseImports(source) {
  const results = [];
  // Match single-line and multi-line import statements
  const importRe = /^(import\s+(?:type\s+)?)([\s\S]*?)\s+from\s+['"]([^'"]+)['"]\s*;?$/gm;
  let match;
  while ((match = importRe.exec(source)) !== null) {
    const prefix = match[1];
    const specifiers = match[2].trim();
    const from = match[3];
    const isType = prefix.includes('type ');
    results.push({ full: match[0], specifiers, from, isType });
  }
  return results;
}

/**
 * Rewrite all imports in a source string.
 * Returns { content, registryDeps, npmDeps }.
 */
function rewriteImports(source) {
  const registryDeps = new Set();
  const npmDeps = {};

  const imports = parseImports(source);

  // Group rewritten imports by target module
  // key = target module, value = { types: Set<string>, values: Set<string> }
  const grouped = {};

  function addToGroup(target, specifiers, isType) {
    if (!grouped[target]) {
      grouped[target] = { types: new Set(), values: new Set() };
    }
    // Extract individual named specifiers from something like "{ Foo, Bar, type Baz }"
    const inner = specifiers.replace(/^\{/, '').replace(/\}$/, '').trim();
    if (!inner) return;
    for (const part of inner.split(',')) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      if (isType || trimmed.startsWith('type ')) {
        grouped[target].types.add(trimmed.replace(/^type\s+/, ''));
      } else {
        grouped[target].values.add(trimmed);
      }
    }
  }

  let rewritten = source;

  // Process imports in reverse order (so indices stay valid)
  const sortedImports = [...imports].sort((a, b) => {
    return rewritten.lastIndexOf(b.full) - rewritten.lastIndexOf(a.full);
  });

  // First pass: remove all internal imports and collect their specifiers
  const internalImportLines = [];
  for (const imp of sortedImports) {
    // Check cross-component
    const crossComp = crossComponentName(imp.from);
    if (crossComp) {
      // This is a type-only import from another component — rewrite to tinda-ui-kit
      addToGroup('tinda-ui-kit', imp.specifiers, imp.isType);
      registryDeps.add(toSlug(crossComp));
      internalImportLines.push(imp.full);
      continue;
    }

    // Check internal rewrite rules
    let matched = false;
    for (const rule of INTERNAL_REWRITE_RULES) {
      if (rule.pattern.test(imp.from)) {
        addToGroup(rule.target, imp.specifiers, imp.isType);
        internalImportLines.push(imp.full);
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // External npm dependency (not peer, not relative)
    if (!imp.from.startsWith('.') && !PEER_AND_INTERNAL.has(imp.from)) {
      // Resolve to the bare package name (handle scoped packages and subpaths)
      let pkgName;
      if (imp.from.startsWith('@')) {
        // Scoped package: @scope/pkg or @scope/pkg/subpath
        const parts = imp.from.split('/');
        pkgName = parts.slice(0, 2).join('/');
      } else {
        pkgName = imp.from.split('/')[0];
      }
      npmDeps[pkgName] = '*';
    }
  }

  // Remove internal import lines from source
  for (const line of internalImportLines) {
    rewritten = rewritten.replace(line, '');
  }

  // Build replacement import lines
  const newImportLines = [];
  for (const [target, { types, values }] of Object.entries(grouped)) {
    if (values.size > 0 && types.size > 0) {
      // Combine: import { Foo, type Bar } from 'target';
      const combined = [
        ...Array.from(values).sort(),
        ...Array.from(types).sort().map((t) => `type ${t}`),
      ].join(', ');
      newImportLines.push(`import { ${combined} } from '${target}';`);
    } else if (values.size > 0) {
      const sorted = Array.from(values).sort().join(', ');
      newImportLines.push(`import { ${sorted} } from '${target}';`);
    } else if (types.size > 0) {
      const sorted = Array.from(types).sort().join(', ');
      newImportLines.push(`import type { ${sorted} } from '${target}';`);
    }
  }

  // Insert new import lines at the top of the file (after any leading react/react-dom imports)
  // Find the position after the last existing import statement
  const lines = rewritten.split('\n');
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*import\s/.test(lines[i])) {
      // Scan forward to find end of multi-line import
      let j = i;
      while (j < lines.length && !lines[j].includes(';') && !lines[j].match(/from\s+['"]/)) {
        j++;
      }
      lastImportIdx = j;
    }
  }

  if (lastImportIdx >= 0 && newImportLines.length > 0) {
    lines.splice(lastImportIdx + 1, 0, ...newImportLines);
  } else if (newImportLines.length > 0) {
    lines.unshift(...newImportLines);
  }

  // Clean up multiple blank lines
  rewritten = lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';

  return { content: rewritten, registryDeps, npmDeps };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function buildRegistry() {
  const componentDirs = readdirSync(COMPONENTS_DIR).filter((name) => {
    const fullPath = join(COMPONENTS_DIR, name);
    return statSync(fullPath).isDirectory() && CATEGORY_MAP[name] !== undefined;
  });

  const components = [];

  for (const compName of componentDirs.sort()) {
    const compDir = join(COMPONENTS_DIR, compName);
    const slug = toSlug(compName);
    const category = CATEGORY_MAP[compName] || 'utility';
    const description = DESCRIPTION_MAP[compName] || `${compName} component`;

    // Gather source files (only .tsx and .ts, skip stories and tests)
    const sourceFiles = readdirSync(compDir).filter((f) => {
      return (
        (f.endsWith('.tsx') || f.endsWith('.ts')) &&
        !f.includes('.stories.') &&
        !f.includes('.test.') &&
        !f.includes('.spec.')
      );
    });

    const allRegistryDeps = new Set();
    const allNpmDeps = {};
    const files = [];

    for (const fileName of sourceFiles) {
      const filePath = join(compDir, fileName);
      const rawContent = readFileSync(filePath, 'utf-8');

      // For the index.ts barrel file, no rewriting needed — just adjust relative paths
      if (fileName === 'index.ts') {
        files.push({
          path: `components/${compName}/${fileName}`,
          content: rawContent,
        });
        continue;
      }

      const { content, registryDeps, npmDeps } = rewriteImports(rawContent);

      for (const dep of registryDeps) {
        // Don't add self as a dependency
        if (dep !== slug) {
          allRegistryDeps.add(dep);
        }
      }
      for (const [pkg, ver] of Object.entries(npmDeps)) {
        allNpmDeps[pkg] = ver;
      }

      files.push({
        path: `components/${compName}/${fileName}`,
        content,
      });
    }

    components.push({
      name: compName,
      slug,
      category,
      description,
      files,
      registryDependencies: Array.from(allRegistryDeps).sort(),
      npmDependencies: allNpmDeps,
    });
  }

  const registry = {
    $schema: 'https://tinda.dev/schema/registry.json',
    version: '0.1.0',
    components,
  };

  mkdirSync(REGISTRY_DIR, { recursive: true });
  const outPath = join(REGISTRY_DIR, 'registry.json');
  writeFileSync(outPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');

  console.log(`Registry written to ${relative(PKG_ROOT, outPath)}`);
  console.log(`  ${components.length} components`);
  console.log(`  Categories: ${[...new Set(components.map((c) => c.category))].sort().join(', ')}`);
}

buildRegistry();
