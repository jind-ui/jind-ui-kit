import fs from 'node:fs';
import path from 'node:path';
import pc from 'picocolors';
import { loadConfig, detectPackageManager, installPackages, ensureDir } from '../utils.js';
import { loadRegistry, findComponent, resolveWithDependencies } from '../registry.js';

export async function add(slugs: string[]): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const registry = loadRegistry(cwd);
  const pm = detectPackageManager(cwd);

  // Validate all requested components exist
  const missing: string[] = [];
  for (const slug of slugs) {
    if (!findComponent(registry, slug)) {
      missing.push(slug);
    }
  }

  if (missing.length > 0) {
    console.error(pc.red(`Unknown components: ${missing.join(', ')}`));
    console.log(pc.dim('Run "jind list" to see available components.'));
    process.exit(1);
  }

  // Resolve with dependencies
  const components = resolveWithDependencies(registry, slugs);
  const requested = new Set(slugs.map((s) => s.toLowerCase()));

  console.log(pc.bold('\n  Adding components:\n'));

  // Collect npm deps
  const npmDeps: Record<string, string> = {};
  const written: string[] = [];
  const skipped: string[] = [];

  for (const component of components) {
    const componentDir = path.join(cwd, config.componentsDir, component.name);
    const isDep = !requested.has(component.slug);
    const label = isDep
      ? `${pc.dim('(dependency)')} ${component.name}`
      : component.name;

    // Check if already exists
    if (fs.existsSync(componentDir)) {
      console.log(`  ${pc.yellow('o')} ${label} ${pc.dim('-- already exists, skipping')}`);
      skipped.push(component.name);
      continue;
    }

    // Write files
    ensureDir(componentDir);
    for (const file of component.files) {
      const fileName = path.basename(file.path);
      const filePath = path.join(componentDir, fileName);
      fs.writeFileSync(filePath, file.content);
    }

    console.log(`  ${pc.green('+')} ${label}`);
    written.push(component.name);

    // Collect npm deps
    Object.assign(npmDeps, component.npmDependencies);
  }

  // Install npm dependencies (filter out already installed)
  const depsToInstall = Object.entries(npmDeps)
    .filter(([pkg]) => {
      const pkgJsonPath = path.join(cwd, 'node_modules', pkg, 'package.json');
      return !fs.existsSync(pkgJsonPath);
    })
    .map(([pkg, ver]) => `${pkg}@${ver}`);

  if (depsToInstall.length > 0) {
    console.log(`\n  Installing dependencies: ${pc.cyan(depsToInstall.join(', '))}...`);
    installPackages(pm, depsToInstall, cwd);
  }

  // Summary
  console.log(`
${pc.bold(pc.green('  Done!'))} Added ${written.length} component${written.length !== 1 ? 's' : ''}${skipped.length > 0 ? `, skipped ${skipped.length}` : ''}.

  ${pc.bold('Import:')}
${written.map((name) => `  ${pc.dim(`import { ${name} } from "./${config.componentsDir}/${name}";`)}`).join('\n')}
`);
}
