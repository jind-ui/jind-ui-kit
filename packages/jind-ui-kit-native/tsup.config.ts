import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/theme/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2020',
  external: [
    'react',
    'react-native',
    'react-native-reanimated',
  ],
});
