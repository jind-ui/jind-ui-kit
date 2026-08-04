import { createTheme } from 'jind-ui-kit';

export const earthyTheme = createTheme({
  colors: {
    blue: {
      50: '#f5ebe0',
      100: '#e3d5ca',
      200: '#d5bdaf',
      300: '#c4a882',
      400: '#a68a64',
      500: '#8b7355',
      600: '#745e45',
      700: '#5c4a37',
    },
    gray: {
      0: '#faf8f5',
      25: '#f7f4f0',
      50: '#f5ebe0',
      100: '#edede9',
      150: '#e3d5ca',
      200: '#d6ccc2',
      300: '#c4b8ae',
      400: '#a69b91',
      500: '#847770',
      600: '#6b5f58',
      700: '#4a3f38',
      800: '#3a302a',
      900: '#2a2220',
      disabled: '#a69b91',
    },
    red: {
      50: '#fce8e6',
      500: '#c4553d',
      600: '#a8442e',
    },
    green: {
      50: '#e8f0e5',
      500: '#5a7c50',
    },
    amber: {
      50: '#f5ebe0',
      500: '#c49a6c',
    },
  },
  semantic: {
    text: {
      primary: '#2a2220',
      secondary: '#6b5f58',
      muted: '#a69b91',
      inverse: '#faf8f5',
      link: '#8b7355',
      danger: '#c4553d',
    },
    surface: {
      page: '#edede9',
      card: '#faf8f5',
      subtle: '#f7f4f0',
      quiet: '#e3d5ca',
      hover: '#f5ebe0',
      pressed: '#d6ccc2',
      selected: '#f5ebe0',
    },
    border: {
      subtle: '#e3d5ca',
      default: '#d6ccc2',
      strong: '#c4b8ae',
      focus: '#8b7355',
    },
    fill: {
      primary: '#8b7355',
      primaryHover: '#745e45',
      primaryActive: '#5c4a37',
      disabled: '#a69b91',
    },
    icon: {
      default: '#4a3f38',
      muted: '#a69b91',
      danger: '#c4553d',
    },
  },
});
