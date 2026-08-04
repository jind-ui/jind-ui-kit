# jind-ui-kit (Web)

## Quick Start

```bash
npm run build          # Build with tsup
npm run dev            # Watch mode
npm run test           # Vitest
npm run lint           # tsc --noEmit
npm run storybook      # Storybook on :6006
```

## Architecture

```
src/
  tokens/       # colors, typography, spacing, elevation
  theme/        # JindProvider, useTheme, createTheme, Zustand store
  types.ts      # Space, Radius, Shadow, PolymorphicProps, SpacingProps
  primitives/   # Box, Text, Heading, Stack, HStack, VStack, Grid, Divider,
                # Center, Container, Wrap, Portal, AspectRatio, VisuallyHidden
  components/   # 37 composed components (Button, Input, Modal, etc.)
  hooks/        # useControllableState, useBreakpoint, useClickOutside,
                # useFocusTrap, useMediaQuery, useDisclosure, usePrevious,
                # useMergedRef, useTransition, useAnimateValue
```

## Conventions

- Polymorphic components use `as` prop via `PolymorphicProps<C, OwnProps>`
- Components accept `ref` as a regular prop (React 19 pattern, no `forwardRef`)
- Styles are inline objects — no CSS-in-JS runtime
- Theme accessed only via `useTheme()`, never direct token imports in components
- Form components support controlled + uncontrolled via `useControllableState`
- One component per directory: `Name/Name.tsx` + `Name/index.ts`
- Props interfaces exported alongside component

## Key Patterns

- `createTheme(overrides)` deep-merges onto `defaultTheme`
- Zustand vanilla store for theme state (mode, customTheme)
- `Portal` renders via `createPortal` to document.body
- `Motion` wraps framer-motion's `AnimatePresence` for enter/exit animations
- `useClickOutside` + `useFocusTrap` compose for overlay components (Modal, Drawer, Popover)
- `useTransition` handles mount/unmount CSS transitions
- Hover/focus states use CSS pseudo-class equivalents via inline style objects

## Build

- tsup bundles two entry points: `src/index.ts` and `src/theme/index.ts`
- Peer deps: `react`, `react-dom` (external)
- Runtime deps: `zustand`, `motion`
- Output: CJS + ESM + DTS

## Testing

- Vitest + jsdom + @testing-library/react
- Tests live alongside components: `__tests__/` dirs or `*.test.tsx` files
