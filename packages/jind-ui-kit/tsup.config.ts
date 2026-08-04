import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/theme/index.ts', 'src/utils/index.ts', 'src/motion/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  external: ['react', 'react-dom', 'motion', 'motion/react'],
  sourcemap: true,
  minify: false,
});
