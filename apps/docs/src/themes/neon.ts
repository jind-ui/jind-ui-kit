import { createTheme } from 'jind-ui-kit';

const palette = {
  navyElectric: '#390099',
  darkRaspberry: '#9e0059',
  hotFuchsia: '#ff0054',
  blazeOrange: '#ff5400',
  amberGold: '#ffbd00',
};

export const neonTheme = createTheme({
  colors: {
    blue: {
      50: '#f0e6ff',
      100: '#d9c2ff',
      200: '#b78aff',
      300: '#8c4dff',
      400: '#6b1aff',
      500: palette.navyElectric,
      600: '#2d0077',
      700: '#200055',
    },
    gray: {
      0: '#fdfcff',
      25: '#faf8ff',
      50: '#f4f1fa',
      100: '#eae6f2',
      150: '#ddd8ea',
      200: '#ccc7db',
      300: '#aba5be',
      400: '#8a83a1',
      500: '#6b6484',
      600: '#504a66',
      700: '#38334a',
      800: '#252132',
      900: '#16131f',
      disabled: '#8a83a1',
    },
    red: {
      50: '#ffe6ec',
      500: palette.hotFuchsia,
      600: palette.darkRaspberry,
    },
    green: {
      50: '#e6f9ed',
      500: '#22c55e',
    },
    amber: {
      50: '#fff8e0',
      500: palette.amberGold,
    },
  },
  semantic: {
    text: {
      primary: '#16131f',
      secondary: '#504a66',
      muted: '#8a83a1',
      inverse: '#fdfcff',
      link: palette.navyElectric,
      danger: palette.hotFuchsia,
    },
    surface: {
      page: '#f4f1fa',
      card: '#fdfcff',
      subtle: '#faf8ff',
      quiet: '#eae6f2',
      hover: '#f0e6ff',
      pressed: '#ddd8ea',
      selected: '#f0e6ff',
    },
    border: {
      subtle: '#ddd8ea',
      default: '#ccc7db',
      strong: '#aba5be',
      focus: palette.navyElectric,
    },
    fill: {
      primary: palette.navyElectric,
      primaryHover: '#2d0077',
      primaryActive: '#200055',
      disabled: '#8a83a1',
    },
    icon: {
      default: '#38334a',
      muted: '#8a83a1',
      danger: palette.hotFuchsia,
    },
  },
});
