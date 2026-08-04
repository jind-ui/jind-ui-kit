import fs from 'node:fs';
import path from 'node:path';

export interface RegistryFile {
  path: string;
  content: string;
}

export interface RegistryComponent {
  name: string;
  slug: string;
  category: string;
  description: string;
  files: RegistryFile[];
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
}

export interface Registry {
  $schema: string;
  version: string;
  components: RegistryComponent[];
}

export function loadRegistry(cwd: string): Registry {
  const registryPath = path.join(cwd, 'node_modules', 'jind-ui-kit', 'registry', 'registry.json');
  if (!fs.existsSync(registryPath)) {
    throw new Error(
      'Could not find jind-ui-kit registry. Run "jind init" first to install jind-ui-kit.'
    );
  }
  return JSON.parse(fs.readFileSync(registryPath, 'utf-8')) as Registry;
}

export function findComponent(registry: Registry, slug: string): RegistryComponent | undefined {
  return registry.components.find(
    (c) => c.slug === slug.toLowerCase()
  );
}

export function resolveWithDependencies(
  registry: Registry,
  slugs: string[]
): RegistryComponent[] {
  const resolved = new Map<string, RegistryComponent>();
  const visited = new Set<string>();

  function visit(slug: string) {
    if (visited.has(slug)) return;
    visited.add(slug);

    const component = findComponent(registry, slug);
    if (!component) return;

    for (const dep of component.registryDependencies) {
      visit(dep);
    }
    resolved.set(slug, component);
  }

  for (const slug of slugs) {
    visit(slug);
  }

  return Array.from(resolved.values());
}
