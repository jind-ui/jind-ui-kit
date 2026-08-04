# jind-ui-kit-native (React Native)

## Quick Start

```bash
npm run build          # Build with tsup
npm run dev            # Watch mode
npm run lint           # tsc --noEmit
```

## Architecture

```
src/
  tokens/       # colors, typography, spacing, elevation (RN-adapted)
  theme/        # JindProvider, useTheme, createTheme, Zustand store
  types.ts      # Space, Radius, Shadow, SpacingProps (ViewStyle-based)
  primitives/   # Box, Text, Heading, Stack, HStack, VStack, Grid, Divider,
                # Center, Container, Wrap, AspectRatio, VisuallyHidden
  components/   # Ported web components + mobile-specific components
  hooks/        # Platform-agnostic + RN-specific hooks
```

## Platform Differences from Web

| Web | React Native |
|-----|-------------|
| `div` / `span` | `View` / `Text` |
| `button` / `a` | `Pressable` |
| `input` | `TextInput` |
| CSS `boxShadow` string | `NativeShadow` object (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`, `elevation`) |
| `fontWeight: 500` (number) | `fontWeight: '500'` (string) |
| `lineHeight: 1.5` (multiplier) | `lineHeight: 21` (absolute pixels = fontSize * multiplier) |
| CSS `transition` / framer-motion | `Animated` API / `react-native-reanimated` |
| `onClick` / `onMouseEnter` | `onPress` / no hover (use `Pressable` pressed state) |
| CSS Grid | `flexWrap` layout with calculated child widths |
| `createPortal` | `Modal` from react-native |
| `position: fixed` | Not available — use `position: 'absolute'` |
| `cursor`, `outline`, `userSelect` | Not available in RN |

## Conventions

- Components accept `ref` as a regular prop (React 19 pattern, no `forwardRef`)
- Props use `ViewStyle` / `TextStyle` / `ImageStyle` — never `CSSProperties`
- Spacing utils use `paddingHorizontal` / `paddingVertical` / `marginHorizontal` / `marginVertical`
- No `any` types — strict TypeScript throughout
- Same one-component-per-directory pattern as web
- Theme tokens accessed via `useTheme()` only

## Mobile-Specific Components

Components that exist only in the native package:

- `BottomSheet` — Modal bottom sheet with snap points + drag gesture
- `ActionSheet` — iOS-style action menu with slide-up animation
- `SegmentedControl` — Animated tab control with sliding indicator
- `FloatingActionButton` — FAB with positions, sizes, extended label
- `ListItem` — Configurable list row with leading/trailing slots
- `SafeArea` — SafeAreaView wrapper with edge selection
- `StatusBarConfig` — Declarative StatusBar configuration
- `PullToRefresh` — ScrollView + RefreshControl wrapper
- `SwipeableRow` — Swipeable list row with left/right actions
- `KeyboardAvoidingWrapper` — Platform-aware KeyboardAvoidingView
- `EmptyState` — Centered placeholder with icon, title, action
- `NavigationBar` — App navigation bar with back button + title
- `ScreenContainer` — Composes SafeArea + StatusBar + NavigationBar + scroll

## RN-Specific Hooks

- `useBackHandler(callback, enabled)` — Android hardware back button
- `useKeyboard()` — Keyboard visibility + height
- `useDimensions()` — Window dimensions with resize listener
- `useBreakpoint()` — Breakpoint detection via `Dimensions` API

## Build

- tsup bundles two entry points: `src/index.ts` and `src/theme/index.ts`
- Peer deps: `react`, `react-native` (external)
- Runtime deps: `react-native-reanimated`, `zustand`
- Output: CJS + ESM + DTS

## Key Patterns

- Shadows spread directly into style: `...theme.shadow.sm` (NativeShadow → ViewStyle)
- `Platform.select` for font families: iOS = 'System', Android = 'Roboto'
- Easing values are `readonly [number, number, number, number]` tuples
- No hover states — feedback via `Pressable`'s `pressed` argument
- `Animated.spring` / `Animated.timing` for gesture-driven animations
- `PanResponder` for swipe/drag gestures (BottomSheet, SwipeableRow)
