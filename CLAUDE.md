# Jind UI Kit Monorepo

## Structure

```
packages/
  jind-ui-kit/          # React (web) component library
  jind-ui-kit-native/   # React Native component library
apps/
  docs/                  # Vite documentation site
```

## Commands

```bash
# Install all workspace dependencies
npm install

# Build web UI kit
npm run build --workspace=packages/jind-ui-kit

# Build native UI kit
npm run build --workspace=packages/jind-ui-kit-native

# Run docs dev server (port 5173)
npm run dev --workspace=apps/docs

# Run web tests
npm run test --workspace=packages/jind-ui-kit

# Run native tests
npm run test --workspace=packages/jind-ui-kit-native

# Type check (per package)
cd packages/jind-ui-kit && npx tsc --noEmit
cd packages/jind-ui-kit-native && npx tsc --noEmit
```

## Architecture

Both packages share the same design principles but target different platforms:

- **Layered composition**: Primitives (Box, Text, Stack) compose into components (Button, Input, Card)
- **Polymorphic components**: Web uses `as` prop with `forwardRef`. Native uses component-specific variants.
- **Theme-driven**: All visual values come from the theme via `useTheme()`. No hardcoded colors or sizes.
- **Strict TypeScript**: No `any`. All props interfaces are explicit. Use discriminated unions over optional props where possible.
- **Controlled & uncontrolled**: Form components support both patterns via `useControllableState`.

## Conventions

- One component per directory: `ComponentName/ComponentName.tsx`, `index.ts`
- Props interface exported alongside component: `export interface ButtonProps { ... }`
- All components use `forwardRef`
- Styles are inline objects, not CSS-in-JS libraries
- Theme accessed via `useTheme()` hook, never imported directly
- `createTheme()` for deep-merging theme overrides

## Token Categories

| Category | Source |
|----------|--------|
| Colors | `tokens/colors.ts` - color ramps + semantic mappings |
| Typography | `tokens/typography.ts` - font families, sizes, weights, variants |
| Spacing | `tokens/spacing.ts` - space scale, control heights/padding |
| Elevation | `tokens/elevation.ts` - radius, shadows, focus rings, animation |

## Web vs Native Differences

| Web | Native |
|-----|--------|
| `div` | `View` |
| `span` / `p` | `Text` (RN) |
| `button` | `Pressable` |
| `input` | `TextInput` |
| CSS `boxShadow` | RN shadow props (`shadowColor`, `shadowOffset`, etc.) or `elevation` |
| CSS `transition` | `Animated` API or `react-native-reanimated` |
| `onClick` | `onPress` |
| `onMouseEnter/Leave` | N/A (use `Pressable` style function for pressed state) |
| CSS Grid | Flex-based layouts |
| `overflow: hidden` | `overflow: 'hidden'` (limited) |
| Portal (DOM) | Modal (RN) |
| `position: fixed` | Not supported in RN |

## Important Notes

- After modifying web UI kit source, rebuild with `npm run build --workspace=packages/jind-ui-kit` for docs to pick up changes
- Vite HMR may fail after rebuild — do a full page refresh
- Theme switcher dropdown needs `overflow: visible` on sidebar ancestors to avoid clipping
- The docs site imports from the built `dist/`, not source
