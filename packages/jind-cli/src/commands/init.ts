import fs from 'node:fs';
import path from 'node:path';
import pc from 'picocolors';
import { detectPackageManager, installPackages, writeConfig, type JindConfig } from '../utils.js';

export async function init(): Promise<void> {
  const cwd = process.cwd();

  // Check if already initialized
  if (fs.existsSync(path.join(cwd, 'jind.json'))) {
    console.log(pc.yellow('jind.json already exists. Skipping init.'));
    return;
  }

  console.log(pc.bold('\n  Initializing Jind UI Kit...\n'));

  // Detect package manager
  const pm = detectPackageManager(cwd);
  console.log(`  Package manager: ${pc.cyan(pm)}`);

  // Detect TypeScript
  const hasTs = fs.existsSync(path.join(cwd, 'tsconfig.json'));
  console.log(`  TypeScript: ${hasTs ? pc.green('detected') : pc.dim('not found')}`);

  // Detect src directory
  const hasSrc = fs.existsSync(path.join(cwd, 'src'));
  const componentsDir = hasSrc ? 'src/components/ui' : 'components/ui';

  // Write config
  const config: JindConfig = {
    $schema: 'https://jind.dev/schema/jind.json',
    componentsDir,
    typescript: hasTs,
  };
  writeConfig(cwd, config);
  console.log(`  Created ${pc.green('jind.json')}`);

  // Install jind-ui-kit
  console.log(`\n  Installing ${pc.cyan('jind-ui-kit')}...`);
  installPackages(pm, ['jind-ui-kit'], cwd);

  // Print next steps
  console.log(`
${pc.bold(pc.green('  Done! Jind initialized.'))}

  ${pc.bold('Next steps:')}

  1. Wrap your app with JindProvider:

     ${pc.dim('import { JindProvider } from "jind-ui-kit";')}

     ${pc.dim('<JindProvider>')}
       ${pc.dim('<App />')}
     ${pc.dim('</JindProvider>')}

  2. Add components:

     ${pc.dim('$ npx jind-cli add button modal tabs')}

  3. Import from your components directory:

     ${pc.dim(`import { Button } from "./${componentsDir}/Button";`)}
`);
}
