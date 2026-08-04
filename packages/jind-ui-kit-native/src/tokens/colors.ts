interface ColorRamp {
  readonly [key: string]: string;
}

export const colors = {
  blue: {
    50: '#eff5ff',
    100: '#dbe8fe',
    200: '#bcd5fd',
    500: '#1a72f6',
    600: '#0b65ed',
    700: '#1c5ce6',
  },
  gray: {
    0: '#ffffff',
    25: '#fcfbfc',
    50: '#f9f9f9',
    100: '#f2f7fa',
    150: '#eceef0',
    200: '#e7e9eb',
    300: '#d6d9dd',
    400: '#a9b0b6',
    500: '#7c8083',
    600: '#5d676f',
    700: '#383b45',
    800: '#2b303b',
    900: '#23262f',
    disabled: '#8f959c',
  },
  red: {
    50: '#fdecea',
    500: '#e8503a',
    600: '#d5432c',
  },
  green: {
    50: '#e7f6ea',
    500: '#38a847',
  },
  amber: {
    50: '#fff8ec',
    500: '#d09208',
    600: '#c49c26',
  },
  teal: {
    50: '#dff6f3',
    600: '#4b9ba1',
  },
  purple: {
    50: '#efebff',
    500: '#6f57ea',
  },
} as const satisfies Record<string, ColorRamp>;

interface SemanticGroup {
  readonly [key: string]: string;
}

export const semanticColors = {
  text: {
    primary: colors.gray[900],
    secondary: colors.gray[500],
    muted: colors.gray[400],
    inverse: '#ffffff',
    link: colors.blue[500],
    danger: colors.red[500],
  },
  surface: {
    page: colors.gray[100],
    card: colors.gray[0],
    subtle: colors.gray[25],
    quiet: colors.gray[150],
    hover: colors.gray[50],
    pressed: colors.gray[200],
    selected: colors.blue[50],
  },
  border: {
    subtle: colors.gray[200],
    default: colors.gray[300],
    strong: colors.gray[400],
    focus: colors.blue[500],
  },
  fill: {
    primary: colors.blue[500],
    primaryHover: colors.blue[600],
    primaryActive: colors.blue[700],
    disabled: colors.gray.disabled,
  },
  icon: {
    default: colors.gray[700],
    muted: colors.gray[400],
    danger: colors.red[500],
  },
} as const satisfies Record<string, SemanticGroup>;

export type SemanticColors = typeof semanticColors;
