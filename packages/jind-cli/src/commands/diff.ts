import fs from 'node:fs';
import path from 'node:path';
import pc from 'picocolors';
import { loadConfig } from '../utils.js';
import { loadRegistry, findComponent } from '../registry.js';

export async function diff(slug: string): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const registry = loadRegistry(cwd);

  const component = findComponent(registry, slug);
  if (!component) {
    console.error(pc.red(`Unknown component: ${slug}`));
    process.exit(1);
  }

  const componentDir = path.join(cwd, config.componentsDir, component.name);
  if (!fs.existsSync(componentDir)) {
    console.log(pc.yellow(`  ${component.name} is not installed locally.`));
    console.log(pc.dim(`  Run: npx jind-cli add ${slug}`));
    return;
  }

  console.log(pc.bold(`\n  Comparing ${component.name}:\n`));

  let hasChanges = false;
  for (const file of component.files) {
    const fileName = path.basename(file.path);
    const localPath = path.join(componentDir, fileName);

    if (!fs.existsSync(localPath)) {
      console.log(`  ${pc.red('x')} ${fileName} ${pc.dim('-- missing locally')}`);
      hasChanges = true;
      continue;
    }

    const localContent = fs.readFileSync(localPath, 'utf-8');
    if (localContent === file.content) {
      console.log(`  ${pc.green('=')} ${fileName} ${pc.dim('-- unchanged')}`);
    } else {
      console.log(`  ${pc.yellow('~')} ${fileName} ${pc.dim('-- modified locally')}`);
      hasChanges = true;
    }
  }

  if (!hasChanges) {
    console.log(pc.dim('\n  Component matches the registry version.\n'));
  } else {
    console.log(pc.dim('\n  Component has local modifications.\n'));
  }
}
