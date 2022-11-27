import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    light: {
      shade: '#F0F1EE',
      accent: '#8EACC0',
    },
    main: '#756052',
    dark: {
      accent: '#988A78',
      shade: '#343C3B',
    },
    white: '#FFFFFF',
    black: '#000000',
  },
  fonts: {
    heading: 'Mulish_700Bold',
    body: 'Mulish_400Regular',
    light: 'Mulish_300Light',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148,
  },
});
