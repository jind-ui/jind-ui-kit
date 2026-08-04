import { NavLink } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { ThemeKey } from '../themes';

interface NavItem {
  label: string;
  path: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Introduction', path: '/' },
      { label: 'Getting Started', path: '/getting-started' },
      { label: 'CLI', path: '/cli' },
      { label: 'LLM Integration', path: '/llms' },
      { label: 'Theming', path: '/theming' },
      { label: 'Examples', path: '/examples' },
    ],
  },
  {
    title: 'Design Tokens',
    items: [
      { label: 'Colors', path: '/tokens/colors' },
      { label: 'Typography', path: '/tokens/typography' },
      { label: 'Spacing', path: '/tokens/spacing' },
      { label: 'Elevation', path: '/tokens/elevation' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { label: 'Box', path: '/components/box' },
      { label: 'Stack / HStack / VStack', path: '/components/stack' },
      { label: 'Grid', path: '/components/grid' },
      { label: 'Center', path: '/components/center' },
      { label: 'Container', path: '/components/container' },
      { label: 'ScrollArea', path: '/components/scroll-area' },
      { label: 'Resizable', path: '/components/resizable' },
    ],
  },
  {
    title: 'Typography',
    items: [
      { label: 'Text', path: '/components/text' },
      { label: 'Heading', path: '/components/heading' },
    ],
  },
  {
    title: 'Buttons',
    items: [
      { label: 'Button', path: '/components/button' },
      { label: 'IconButton', path: '/components/icon-button' },
      { label: 'TextButton', path: '/components/text-button' },
      { label: 'ButtonGroup', path: '/components/button-group' },
    ],
  },
  {
    title: 'Forms',
    items: [
      { label: 'Input', path: '/components/input' },
      { label: 'Textarea', path: '/components/textarea' },
      { label: 'Select', path: '/components/select' },
      { label: 'Checkbox', path: '/components/checkbox' },
      { label: 'Radio', path: '/components/radio' },
      { label: 'Switch', path: '/components/switch' },
      { label: 'Slider', path: '/components/slider' },
      { label: 'SearchInput', path: '/components/search-input' },
      { label: 'TagsInput', path: '/components/tags-input' },
      { label: 'DateInput', path: '/components/date-input' },
      { label: 'FileUploader', path: '/components/file-uploader' },
      { label: 'Combobox', path: '/components/combobox' },
      { label: 'InputOTP', path: '/components/input-otp' },
      { label: 'InputGroup', path: '/components/input-group' },
      { label: 'NativeSelect', path: '/components/native-select' },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { label: 'Badge', path: '/components/badge' },
      { label: 'Chip', path: '/components/chip' },
      { label: 'Card', path: '/components/card' },
      { label: 'Avatar', path: '/components/avatar' },
      { label: 'StatusDot', path: '/components/status-dot' },
      { label: 'Skeleton', path: '/components/skeleton' },
      { label: 'ProgressStat', path: '/components/progress-stat' },
      { label: 'Table', path: '/components/table' },
      { label: 'DataTable', path: '/components/data-table' },
      { label: 'Kbd', path: '/components/kbd' },
    ],
  },
  {
    title: 'Overlay',
    items: [
      { label: 'Modal', path: '/components/modal' },
      { label: 'Tooltip', path: '/components/tooltip' },
      { label: 'Popover', path: '/components/popover' },
      { label: 'Drawer', path: '/components/drawer' },
      { label: 'Toast', path: '/components/toast' },
      { label: 'Banner', path: '/components/banner' },
      { label: 'Menu', path: '/components/menu' },
      { label: 'CommandMenu', path: '/components/command-menu' },
      { label: 'AlertDialog', path: '/components/alert-dialog' },
      { label: 'ContextMenu', path: '/components/context-menu' },
      { label: 'HoverCard', path: '/components/hover-card' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { label: 'Tabs', path: '/components/tabs' },
      { label: 'Accordion', path: '/components/accordion' },
      { label: 'Breadcrumbs', path: '/components/breadcrumbs' },
      { label: 'Pagination', path: '/components/pagination' },
      { label: 'Stepper', path: '/components/stepper' },
      { label: 'Sidebar', path: '/components/sidebar' },
      { label: 'NavigationMenu', path: '/components/navigation-menu' },
      { label: 'MegaMenu', path: '/components/mega-menu' },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Carousel', path: '/components/carousel' },
      { label: 'TreeView', path: '/components/tree-view' },
      { label: 'Collapsible', path: '/components/collapsible' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { label: 'Spinner', path: '/components/spinner' },
      { label: 'Alert', path: '/components/alert' },
      { label: 'EmptyState', path: '/components/empty-state' },
    ],
  },
  {
    title: 'Animation',
    items: [
      { label: 'Motion', path: '/components/motion' },
    ],
  },
  {
    title: 'Cross-Platform Features',
    items: [
      { label: 'ThemeOverride', path: '/features/theme-override' },
      { label: 'InteractionGroup', path: '/features/interaction-group' },
    ],
  },
  {
    title: 'React Native',
    items: [
      { label: 'BottomTabBar', path: '/native/bottom-tab-bar' },
      { label: 'CollapsibleAppBar', path: '/native/collapsible-app-bar' },
      { label: 'Snackbar', path: '/native/snackbar' },
    ],
  },
  {
    title: 'Hooks',
    items: [
      { label: 'useDisclosure', path: '/hooks/use-disclosure' },
      { label: 'useBreakpoint', path: '/hooks/use-breakpoint' },
      { label: 'useControllableState', path: '/hooks/use-controllable-state' },
      { label: 'useClickOutside', path: '/hooks/use-click-outside' },
      { label: 'useFocusTrap', path: '/hooks/use-focus-trap' },
      { label: 'useMediaQuery', path: '/hooks/use-media-query' },
      { label: 'useMergedRef', path: '/hooks/use-merged-ref' },
      { label: 'usePrevious', path: '/hooks/use-previous' },
      { label: 'useTransition', path: '/hooks/use-transition' },
      { label: 'useAnimateValue', path: '/hooks/use-animate-value' },
      { label: 'usePressAnimation', path: '/hooks/use-press-animation' },
    ],
  },
];

interface SidebarProps {
  themeKey: ThemeKey;
  onThemeChange: (key: ThemeKey) => void;
}

export function Sidebar({ themeKey, onThemeChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">T</div>
        <div>
          <div className="sidebar-title">Jind UI Kit</div>
          <div className="sidebar-version">v0.1.0</div>
        </div>
      </div>
      <ThemeSwitcher current={themeKey} onChange={onThemeChange} />
      <nav className="sidebar-nav">
        {navigation.map((group) => (
          <div className="nav-group" key={group.title}>
            <div className="nav-group-label">{group.title}</div>
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
