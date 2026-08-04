import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { GettingStarted } from './pages/GettingStarted';
import { Theming } from './pages/Theming';
import { Examples } from './pages/Examples';
import { TokensColors } from './pages/TokensColors';
import { TokensTypography } from './pages/TokensTypography';
import { TokensSpacing } from './pages/TokensSpacing';
import { TokensElevation } from './pages/TokensElevation';
import { ComponentBox } from './pages/ComponentBox';
import { ComponentStack } from './pages/ComponentStack';
import { ComponentGrid } from './pages/ComponentGrid';
import { ComponentCenter } from './pages/ComponentCenter';
import { ComponentContainer } from './pages/ComponentContainer';
import { ComponentText } from './pages/ComponentText';
import { ComponentHeading } from './pages/ComponentHeading';
import { ComponentButton } from './pages/ComponentButton';
import { ComponentIconButton } from './pages/ComponentIconButton';
import { ComponentTextButton } from './pages/ComponentTextButton';
import { ComponentInput } from './pages/ComponentInput';
import { ComponentTextarea } from './pages/ComponentTextarea';
import { ComponentSelect } from './pages/ComponentSelect';
import { ComponentCheckbox } from './pages/ComponentCheckbox';
import { ComponentRadio } from './pages/ComponentRadio';
import { ComponentSwitch } from './pages/ComponentSwitch';
import { ComponentSlider } from './pages/ComponentSlider';
import { ComponentSearchInput } from './pages/ComponentSearchInput';
import { ComponentTagsInput } from './pages/ComponentTagsInput';
import { ComponentDateInput } from './pages/ComponentDateInput';
import { ComponentCombobox } from './pages/ComponentCombobox';
import { ComponentInputOTP } from './pages/ComponentInputOTP';
import { ComponentInputGroup } from './pages/ComponentInputGroup';
import { ComponentNativeSelect } from './pages/ComponentNativeSelect';
import { ComponentBadge } from './pages/ComponentBadge';
import { ComponentChip } from './pages/ComponentChip';
import { ComponentCard } from './pages/ComponentCard';
import { ComponentAvatar } from './pages/ComponentAvatar';
import { ComponentStatusDot } from './pages/ComponentStatusDot';
import { ComponentSkeleton } from './pages/ComponentSkeleton';
import { ComponentProgressStat } from './pages/ComponentProgressStat';
import { ComponentTable } from './pages/ComponentTable';
import { ComponentModal } from './pages/ComponentModal';
import { ComponentTooltip } from './pages/ComponentTooltip';
import { ComponentPopover } from './pages/ComponentPopover';
import { ComponentDrawer } from './pages/ComponentDrawer';
import { ComponentToast } from './pages/ComponentToast';
import { ComponentMenu } from './pages/ComponentMenu';
import { ComponentTabs } from './pages/ComponentTabs';
import { ComponentAccordion } from './pages/ComponentAccordion';
import { HookDisclosure } from './pages/HookDisclosure';
import { HookBreakpoint } from './pages/HookBreakpoint';
import { HookControllableState } from './pages/HookControllableState';
import { HookClickOutside } from './pages/HookClickOutside';
import { HookFocusTrap } from './pages/HookFocusTrap';
import { HookMediaQuery } from './pages/HookMediaQuery';
import { HookMergedRef } from './pages/HookMergedRef';
import { HookPrevious } from './pages/HookPrevious';
import { HookTransition } from './pages/HookTransition';
import { HookAnimateValue } from './pages/HookAnimateValue';
import { ComponentBanner } from './pages/ComponentBanner';
import { ComponentBreadcrumbs } from './pages/ComponentBreadcrumbs';
import { ComponentPagination } from './pages/ComponentPagination';
import { ComponentSpinner } from './pages/ComponentSpinner';
import { ComponentStepper } from './pages/ComponentStepper';
import { ComponentButtonGroup } from './pages/ComponentButtonGroup';
import { ComponentFileUploader } from './pages/ComponentFileUploader';
import { ComponentCommandMenu } from './pages/ComponentCommandMenu';
import { ComponentCarousel } from './pages/ComponentCarousel';
import { ComponentTreeView } from './pages/ComponentTreeView';
import { ComponentScrollArea } from './pages/ComponentScrollArea';
import { ComponentResizable } from './pages/ComponentResizable';
import { ComponentSidebar } from './pages/ComponentSidebar';
import { ComponentDataTable } from './pages/ComponentDataTable';
import { ComponentAlert } from './pages/ComponentAlert';
import { ComponentAlertDialog } from './pages/ComponentAlertDialog';
import { ComponentCollapsible } from './pages/ComponentCollapsible';
import { ComponentKbd } from './pages/ComponentKbd';
import { ComponentNavigationMenu } from './pages/ComponentNavigationMenu';
import { ComponentMegaMenu } from './pages/ComponentMegaMenu';
import { ComponentContextMenu } from './pages/ComponentContextMenu';
import { ComponentHoverCard } from './pages/ComponentHoverCard';
import { ComponentEmptyState } from './pages/ComponentEmptyState';
import { FeatureThemeOverride } from './pages/FeatureThemeOverride';
import { FeatureInteractionGroup } from './pages/FeatureInteractionGroup';
import { NativeBottomTabBar } from './pages/NativeBottomTabBar';
import { NativeCollapsibleAppBar } from './pages/NativeCollapsibleAppBar';
import { NativeSnackbar } from './pages/NativeSnackbar';
import { ComponentMotion } from './pages/ComponentMotion';
import { HookPressAnimation } from './pages/HookPressAnimation';
import { CLI } from './pages/CLI';
import { LLMs } from './pages/LLMs';
import type { ThemeKey } from './themes';

interface AppProps {
  themeKey: ThemeKey;
  onThemeChange: (key: ThemeKey) => void;
}

export function App({ themeKey, onThemeChange }: AppProps) {
  return (
    <div className="app-layout">
      <Sidebar themeKey={themeKey} onThemeChange={onThemeChange} />
      <main className="main-content">
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
      </main>
    </div>
  );
}
