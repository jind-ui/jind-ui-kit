import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Spinner } from 'jind-ui-kit';
import type { ThemeKey } from './themes';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const GettingStarted = lazy(() => import('./pages/GettingStarted').then(m => ({ default: m.GettingStarted })));
const Theming = lazy(() => import('./pages/Theming').then(m => ({ default: m.Theming })));
const Examples = lazy(() => import('./pages/Examples').then(m => ({ default: m.Examples })));
const CLI = lazy(() => import('./pages/CLI').then(m => ({ default: m.CLI })));
const LLMs = lazy(() => import('./pages/LLMs').then(m => ({ default: m.LLMs })));

const TokensColors = lazy(() => import('./pages/TokensColors').then(m => ({ default: m.TokensColors })));
const TokensTypography = lazy(() => import('./pages/TokensTypography').then(m => ({ default: m.TokensTypography })));
const TokensSpacing = lazy(() => import('./pages/TokensSpacing').then(m => ({ default: m.TokensSpacing })));
const TokensElevation = lazy(() => import('./pages/TokensElevation').then(m => ({ default: m.TokensElevation })));

const ComponentBox = lazy(() => import('./pages/ComponentBox').then(m => ({ default: m.ComponentBox })));
const ComponentStack = lazy(() => import('./pages/ComponentStack').then(m => ({ default: m.ComponentStack })));
const ComponentGrid = lazy(() => import('./pages/ComponentGrid').then(m => ({ default: m.ComponentGrid })));
const ComponentCenter = lazy(() => import('./pages/ComponentCenter').then(m => ({ default: m.ComponentCenter })));
const ComponentContainer = lazy(() => import('./pages/ComponentContainer').then(m => ({ default: m.ComponentContainer })));
const ComponentText = lazy(() => import('./pages/ComponentText').then(m => ({ default: m.ComponentText })));
const ComponentHeading = lazy(() => import('./pages/ComponentHeading').then(m => ({ default: m.ComponentHeading })));
const ComponentButton = lazy(() => import('./pages/ComponentButton').then(m => ({ default: m.ComponentButton })));
const ComponentIconButton = lazy(() => import('./pages/ComponentIconButton').then(m => ({ default: m.ComponentIconButton })));
const ComponentTextButton = lazy(() => import('./pages/ComponentTextButton').then(m => ({ default: m.ComponentTextButton })));
const ComponentInput = lazy(() => import('./pages/ComponentInput').then(m => ({ default: m.ComponentInput })));
const ComponentTextarea = lazy(() => import('./pages/ComponentTextarea').then(m => ({ default: m.ComponentTextarea })));
const ComponentSelect = lazy(() => import('./pages/ComponentSelect').then(m => ({ default: m.ComponentSelect })));
const ComponentCheckbox = lazy(() => import('./pages/ComponentCheckbox').then(m => ({ default: m.ComponentCheckbox })));
const ComponentRadio = lazy(() => import('./pages/ComponentRadio').then(m => ({ default: m.ComponentRadio })));
const ComponentSwitch = lazy(() => import('./pages/ComponentSwitch').then(m => ({ default: m.ComponentSwitch })));
const ComponentSlider = lazy(() => import('./pages/ComponentSlider').then(m => ({ default: m.ComponentSlider })));
const ComponentSearchInput = lazy(() => import('./pages/ComponentSearchInput').then(m => ({ default: m.ComponentSearchInput })));
const ComponentTagsInput = lazy(() => import('./pages/ComponentTagsInput').then(m => ({ default: m.ComponentTagsInput })));
const ComponentDateInput = lazy(() => import('./pages/ComponentDateInput').then(m => ({ default: m.ComponentDateInput })));
const ComponentCombobox = lazy(() => import('./pages/ComponentCombobox').then(m => ({ default: m.ComponentCombobox })));
const ComponentInputOTP = lazy(() => import('./pages/ComponentInputOTP').then(m => ({ default: m.ComponentInputOTP })));
const ComponentInputGroup = lazy(() => import('./pages/ComponentInputGroup').then(m => ({ default: m.ComponentInputGroup })));
const ComponentNativeSelect = lazy(() => import('./pages/ComponentNativeSelect').then(m => ({ default: m.ComponentNativeSelect })));
const ComponentBadge = lazy(() => import('./pages/ComponentBadge').then(m => ({ default: m.ComponentBadge })));
const ComponentChip = lazy(() => import('./pages/ComponentChip').then(m => ({ default: m.ComponentChip })));
const ComponentCard = lazy(() => import('./pages/ComponentCard').then(m => ({ default: m.ComponentCard })));
const ComponentAvatar = lazy(() => import('./pages/ComponentAvatar').then(m => ({ default: m.ComponentAvatar })));
const ComponentStatusDot = lazy(() => import('./pages/ComponentStatusDot').then(m => ({ default: m.ComponentStatusDot })));
const ComponentSkeleton = lazy(() => import('./pages/ComponentSkeleton').then(m => ({ default: m.ComponentSkeleton })));
const ComponentProgressStat = lazy(() => import('./pages/ComponentProgressStat').then(m => ({ default: m.ComponentProgressStat })));
const ComponentTable = lazy(() => import('./pages/ComponentTable').then(m => ({ default: m.ComponentTable })));
const ComponentModal = lazy(() => import('./pages/ComponentModal').then(m => ({ default: m.ComponentModal })));
const ComponentTooltip = lazy(() => import('./pages/ComponentTooltip').then(m => ({ default: m.ComponentTooltip })));
const ComponentPopover = lazy(() => import('./pages/ComponentPopover').then(m => ({ default: m.ComponentPopover })));
const ComponentDrawer = lazy(() => import('./pages/ComponentDrawer').then(m => ({ default: m.ComponentDrawer })));
const ComponentToast = lazy(() => import('./pages/ComponentToast').then(m => ({ default: m.ComponentToast })));
const ComponentMenu = lazy(() => import('./pages/ComponentMenu').then(m => ({ default: m.ComponentMenu })));
const ComponentTabs = lazy(() => import('./pages/ComponentTabs').then(m => ({ default: m.ComponentTabs })));
const ComponentAccordion = lazy(() => import('./pages/ComponentAccordion').then(m => ({ default: m.ComponentAccordion })));
const ComponentBanner = lazy(() => import('./pages/ComponentBanner').then(m => ({ default: m.ComponentBanner })));
const ComponentBreadcrumbs = lazy(() => import('./pages/ComponentBreadcrumbs').then(m => ({ default: m.ComponentBreadcrumbs })));
const ComponentPagination = lazy(() => import('./pages/ComponentPagination').then(m => ({ default: m.ComponentPagination })));
const ComponentSpinner = lazy(() => import('./pages/ComponentSpinner').then(m => ({ default: m.ComponentSpinner })));
const ComponentStepper = lazy(() => import('./pages/ComponentStepper').then(m => ({ default: m.ComponentStepper })));
const ComponentButtonGroup = lazy(() => import('./pages/ComponentButtonGroup').then(m => ({ default: m.ComponentButtonGroup })));
const ComponentFileUploader = lazy(() => import('./pages/ComponentFileUploader').then(m => ({ default: m.ComponentFileUploader })));
const ComponentCommandMenu = lazy(() => import('./pages/ComponentCommandMenu').then(m => ({ default: m.ComponentCommandMenu })));
const ComponentCarousel = lazy(() => import('./pages/ComponentCarousel').then(m => ({ default: m.ComponentCarousel })));
const ComponentTreeView = lazy(() => import('./pages/ComponentTreeView').then(m => ({ default: m.ComponentTreeView })));
const ComponentScrollArea = lazy(() => import('./pages/ComponentScrollArea').then(m => ({ default: m.ComponentScrollArea })));
const ComponentResizable = lazy(() => import('./pages/ComponentResizable').then(m => ({ default: m.ComponentResizable })));
const ComponentSidebar = lazy(() => import('./pages/ComponentSidebar').then(m => ({ default: m.ComponentSidebar })));
const ComponentDataTable = lazy(() => import('./pages/ComponentDataTable').then(m => ({ default: m.ComponentDataTable })));
const ComponentAlert = lazy(() => import('./pages/ComponentAlert').then(m => ({ default: m.ComponentAlert })));
const ComponentAlertDialog = lazy(() => import('./pages/ComponentAlertDialog').then(m => ({ default: m.ComponentAlertDialog })));
const ComponentCollapsible = lazy(() => import('./pages/ComponentCollapsible').then(m => ({ default: m.ComponentCollapsible })));
const ComponentKbd = lazy(() => import('./pages/ComponentKbd').then(m => ({ default: m.ComponentKbd })));
const ComponentNavigationMenu = lazy(() => import('./pages/ComponentNavigationMenu').then(m => ({ default: m.ComponentNavigationMenu })));
const ComponentMegaMenu = lazy(() => import('./pages/ComponentMegaMenu').then(m => ({ default: m.ComponentMegaMenu })));
const ComponentContextMenu = lazy(() => import('./pages/ComponentContextMenu').then(m => ({ default: m.ComponentContextMenu })));
const ComponentHoverCard = lazy(() => import('./pages/ComponentHoverCard').then(m => ({ default: m.ComponentHoverCard })));
const ComponentEmptyState = lazy(() => import('./pages/ComponentEmptyState').then(m => ({ default: m.ComponentEmptyState })));
const ComponentMotion = lazy(() => import('./pages/ComponentMotion').then(m => ({ default: m.ComponentMotion })));
const HookDisclosure = lazy(() => import('./pages/HookDisclosure').then(m => ({ default: m.HookDisclosure })));
const HookBreakpoint = lazy(() => import('./pages/HookBreakpoint').then(m => ({ default: m.HookBreakpoint })));
const HookControllableState = lazy(() => import('./pages/HookControllableState').then(m => ({ default: m.HookControllableState })));
const HookClickOutside = lazy(() => import('./pages/HookClickOutside').then(m => ({ default: m.HookClickOutside })));
const HookFocusTrap = lazy(() => import('./pages/HookFocusTrap').then(m => ({ default: m.HookFocusTrap })));
const HookMediaQuery = lazy(() => import('./pages/HookMediaQuery').then(m => ({ default: m.HookMediaQuery })));
const HookMergedRef = lazy(() => import('./pages/HookMergedRef').then(m => ({ default: m.HookMergedRef })));
const HookPrevious = lazy(() => import('./pages/HookPrevious').then(m => ({ default: m.HookPrevious })));
const HookTransition = lazy(() => import('./pages/HookTransition').then(m => ({ default: m.HookTransition })));
const HookAnimateValue = lazy(() => import('./pages/HookAnimateValue').then(m => ({ default: m.HookAnimateValue })));
const HookPressAnimation = lazy(() => import('./pages/HookPressAnimation').then(m => ({ default: m.HookPressAnimation })));
const FeatureThemeOverride = lazy(() => import('./pages/FeatureThemeOverride').then(m => ({ default: m.FeatureThemeOverride })));
const FeatureInteractionGroup = lazy(() => import('./pages/FeatureInteractionGroup').then(m => ({ default: m.FeatureInteractionGroup })));
const NativeBottomTabBar = lazy(() => import('./pages/NativeBottomTabBar').then(m => ({ default: m.NativeBottomTabBar })));
const NativeCollapsibleAppBar = lazy(() => import('./pages/NativeCollapsibleAppBar').then(m => ({ default: m.NativeCollapsibleAppBar })));
const NativeSnackbar = lazy(() => import('./pages/NativeSnackbar').then(m => ({ default: m.NativeSnackbar })));

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
      <Spinner size="md" />
    </div>
  );
}

interface AppProps {
  themeKey: ThemeKey;
  onThemeChange: (key: ThemeKey) => void;
}

export function App({ themeKey, onThemeChange }: AppProps) {
  return (
    <div className="app-layout">
      <Sidebar themeKey={themeKey} onThemeChange={onThemeChange} />
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/theming" element={<Theming />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/cli" element={<CLI />} />
            <Route path="/llms" element={<LLMs />} />

            <Route path="/tokens/colors" element={<TokensColors />} />
            <Route path="/tokens/typography" element={<TokensTypography />} />
            <Route path="/tokens/spacing" element={<TokensSpacing />} />
            <Route path="/tokens/elevation" element={<TokensElevation />} />

            <Route path="/components/box" element={<ComponentBox />} />
            <Route path="/components/stack" element={<ComponentStack />} />
            <Route path="/components/grid" element={<ComponentGrid />} />
            <Route path="/components/center" element={<ComponentCenter />} />
            <Route path="/components/container" element={<ComponentContainer />} />

            <Route path="/components/text" element={<ComponentText />} />
            <Route path="/components/heading" element={<ComponentHeading />} />

            <Route path="/components/button" element={<ComponentButton />} />
            <Route path="/components/icon-button" element={<ComponentIconButton />} />
            <Route path="/components/text-button" element={<ComponentTextButton />} />

            <Route path="/components/input" element={<ComponentInput />} />
            <Route path="/components/textarea" element={<ComponentTextarea />} />
            <Route path="/components/select" element={<ComponentSelect />} />
            <Route path="/components/checkbox" element={<ComponentCheckbox />} />
            <Route path="/components/radio" element={<ComponentRadio />} />
            <Route path="/components/switch" element={<ComponentSwitch />} />
            <Route path="/components/slider" element={<ComponentSlider />} />
            <Route path="/components/search-input" element={<ComponentSearchInput />} />
            <Route path="/components/tags-input" element={<ComponentTagsInput />} />
            <Route path="/components/date-input" element={<ComponentDateInput />} />
            <Route path="/components/combobox" element={<ComponentCombobox />} />
            <Route path="/components/input-otp" element={<ComponentInputOTP />} />
            <Route path="/components/input-group" element={<ComponentInputGroup />} />
            <Route path="/components/native-select" element={<ComponentNativeSelect />} />

            <Route path="/components/badge" element={<ComponentBadge />} />
            <Route path="/components/chip" element={<ComponentChip />} />
            <Route path="/components/card" element={<ComponentCard />} />
            <Route path="/components/avatar" element={<ComponentAvatar />} />
            <Route path="/components/status-dot" element={<ComponentStatusDot />} />
            <Route path="/components/skeleton" element={<ComponentSkeleton />} />
            <Route path="/components/progress-stat" element={<ComponentProgressStat />} />
            <Route path="/components/table" element={<ComponentTable />} />

            <Route path="/components/modal" element={<ComponentModal />} />
            <Route path="/components/tooltip" element={<ComponentTooltip />} />
            <Route path="/components/popover" element={<ComponentPopover />} />
            <Route path="/components/drawer" element={<ComponentDrawer />} />
            <Route path="/components/toast" element={<ComponentToast />} />
            <Route path="/components/menu" element={<ComponentMenu />} />

            <Route path="/components/tabs" element={<ComponentTabs />} />
            <Route path="/components/accordion" element={<ComponentAccordion />} />

            <Route path="/hooks/use-disclosure" element={<HookDisclosure />} />
            <Route path="/hooks/use-breakpoint" element={<HookBreakpoint />} />
            <Route path="/hooks/use-controllable-state" element={<HookControllableState />} />
            <Route path="/hooks/use-click-outside" element={<HookClickOutside />} />
            <Route path="/hooks/use-focus-trap" element={<HookFocusTrap />} />
            <Route path="/hooks/use-media-query" element={<HookMediaQuery />} />
            <Route path="/hooks/use-merged-ref" element={<HookMergedRef />} />
            <Route path="/hooks/use-previous" element={<HookPrevious />} />
            <Route path="/hooks/use-transition" element={<HookTransition />} />
            <Route path="/hooks/use-animate-value" element={<HookAnimateValue />} />
            <Route path="/hooks/use-press-animation" element={<HookPressAnimation />} />

            <Route path="/components/banner" element={<ComponentBanner />} />
            <Route path="/components/breadcrumbs" element={<ComponentBreadcrumbs />} />
            <Route path="/components/pagination" element={<ComponentPagination />} />
            <Route path="/components/spinner" element={<ComponentSpinner />} />
            <Route path="/components/stepper" element={<ComponentStepper />} />
            <Route path="/components/button-group" element={<ComponentButtonGroup />} />
            <Route path="/components/file-uploader" element={<ComponentFileUploader />} />
            <Route path="/components/command-menu" element={<ComponentCommandMenu />} />
            <Route path="/components/carousel" element={<ComponentCarousel />} />
            <Route path="/components/tree-view" element={<ComponentTreeView />} />
            <Route path="/components/scroll-area" element={<ComponentScrollArea />} />
            <Route path="/components/resizable" element={<ComponentResizable />} />
            <Route path="/components/sidebar" element={<ComponentSidebar />} />
            <Route path="/components/data-table" element={<ComponentDataTable />} />
            <Route path="/components/alert" element={<ComponentAlert />} />
            <Route path="/components/alert-dialog" element={<ComponentAlertDialog />} />
            <Route path="/components/collapsible" element={<ComponentCollapsible />} />
            <Route path="/components/kbd" element={<ComponentKbd />} />
            <Route path="/components/navigation-menu" element={<ComponentNavigationMenu />} />
            <Route path="/components/mega-menu" element={<ComponentMegaMenu />} />
            <Route path="/components/context-menu" element={<ComponentContextMenu />} />
            <Route path="/components/hover-card" element={<ComponentHoverCard />} />
            <Route path="/components/empty-state" element={<ComponentEmptyState />} />
            <Route path="/components/motion" element={<ComponentMotion />} />

            <Route path="/features/theme-override" element={<FeatureThemeOverride />} />
            <Route path="/features/interaction-group" element={<FeatureInteractionGroup />} />

            <Route path="/native/bottom-tab-bar" element={<NativeBottomTabBar />} />
            <Route path="/native/collapsible-app-bar" element={<NativeCollapsibleAppBar />} />
            <Route path="/native/snackbar" element={<NativeSnackbar />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
