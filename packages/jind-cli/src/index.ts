import { parseArgs } from 'node:util';
import pc from 'picocolors';
import { init } from './commands/init.js';
import { add } from './commands/add.js';
import { list } from './commands/list.js';
import { diff } from './commands/diff.js';

const { positionals } = parseArgs({
  allowPositionals: true,
  strict: false,
});

const [command, ...args] = positionals;

const HELP = `
${pc.bold('jind')} — Selective component installer for Jind UI Kit

${pc.bold('Commands:')}
  ${pc.cyan('init')}                    Initialize Jind in your project
  ${pc.cyan('add')} ${pc.dim('<component...>')}     Add components to your project
  ${pc.cyan('list')}                    List all available components
  ${pc.cyan('diff')} ${pc.dim('<component>')}        Compare local vs registry version

${pc.bold('Examples:')}
  ${pc.dim('$')} npx jind-cli init
  ${pc.dim('$')} npx jind-cli add button modal tabs
  ${pc.dim('$')} npx jind-cli list
`;

async function main() {
  switch (command) {
    case 'init':
      await init();
      break;
    case 'add':
      if (args.length === 0) {
        console.error(pc.red('Error: specify at least one component'));
        console.log(`  ${pc.dim('Example:')} npx jind-cli add button modal`);
        process.exit(1);
      }
      await add(args);
      break;
    case 'list':
      await list();
      break;
    case 'diff':
      if (args.length === 0) {
        console.error(pc.red('Error: specify a component'));
        process.exit(1);
      }
      await diff(args[0]);
      break;
    default:
      console.log(HELP);
      break;
  }
}

main().catch((err: Error) => {
  console.error(pc.red(`Error: ${err.message}`));
  process.exit(1);
});
