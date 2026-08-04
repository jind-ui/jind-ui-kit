import pc from 'picocolors';
import { loadRegistry } from '../registry.js';

const CATEGORY_LABELS: Record<string, string> = {
  'buttons': 'Buttons',
  'forms': 'Forms',
  'data-display': 'Data Display',
  'overlay': 'Overlay',
  'navigation': 'Navigation',
  'content': 'Content',
  'feedback': 'Feedback',
  'interaction': 'Interaction',
  'animation': 'Animation',
  'utility': 'Utility',
};

export async function list(): Promise<void> {
  const cwd = process.cwd();
  const registry = loadRegistry(cwd);

  console.log(pc.bold(`\n  Jind UI Kit -- ${registry.components.length} components available\n`));

  // Group by category
  const groups = new Map<string, typeof registry.components>();
  for (const comp of registry.components) {
    const existing = groups.get(comp.category) || [];
    existing.push(comp);
    groups.set(comp.category, existing);
  }

  // Print each category
  for (const [category, components] of groups) {
    const label = CATEGORY_LABELS[category] || category;
    console.log(`  ${pc.bold(pc.cyan(label))}`);
    for (const comp of components) {
      console.log(`    ${pc.white(comp.slug.padEnd(20))} ${pc.dim(comp.description)}`);
    }
    console.log();
  }

  console.log(pc.dim('  Usage: npx jind-cli add <component...>\n'));
}
