import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, 'bun.lockb')) || fs.existsSync(path.join(cwd, 'bun.lock'))) return 'bun';
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

export function installPackages(pm: PackageManager, packages: string[], cwd: string): void {
  if (packages.length === 0) return;
  const cmd = pm === 'yarn'
    ? `yarn add ${packages.join(' ')}`
    : `${pm} install ${packages.join(' ')}`;
  execSync(cmd, { cwd, stdio: 'inherit' });
}

export interface JindConfig {
  $schema?: string;
  componentsDir: string;
  typescript: boolean;
}

export function loadConfig(cwd: string): JindConfig {
  const configPath = path.join(cwd, 'jind.json');
  if (!fs.existsSync(configPath)) {
    throw new Error('No jind.json found. Run "jind init" first.');
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf-8')) as JindConfig;
}

export function writeConfig(cwd: string, config: JindConfig): void {
  fs.writeFileSync(
    path.join(cwd, 'jind.json'),
    JSON.stringify(config, null, 2) + '\n'
  );
}

export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
