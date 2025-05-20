import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      neutral1: string;
      neutral2: string;
      neutral5: string;
      secondary: string;
      backgroundOverlay: string;
      primaryGradient: string;
      tier: {
        epic: string;
        mythic: string;
        legendary: string;
        common: string;
        rare: string;
      };
    };
  }

  interface PaletteOptions {
    custom?: {
      neutral1: string;
      neutral2: string;
      neutral5: string;
      secondary: string;
      backgroundOverlay: string;
      primaryGradient: string;
      tier: {
        epic: string;
        mythic: string;
        legendary: string;
        common: string;
        rare: string;
      };
    };
  }
}

const theme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          maxWidth: '100%',
          '@media (min-width: 640px)': {
            maxWidth: '640px',
          },
          '@media (min-width: 768px)': {
            maxWidth: '768px',
          },
          '@media (min-width: 1024px)': {
            maxWidth: '1024px',
          },
          '@media (min-width: 1280px)': {
            maxWidth: '1280px',
          },
          '@media (min-width: 1536px)': {
            maxWidth: '1536px',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
  palette: {
    primary: {
      main: '#DA458F',
    },
    secondary: {
      main: '#FBC625',
    },
    custom: {
      neutral1: '#17161A',
      neutral2: '#3A3841',
      neutral5: '#FFFFFF',
      secondary: '#FBC625',
      primaryGradient: 'linear-gradient(91.47deg, #DA458F -6%, #DA34DD 113.05%)',
      backgroundOverlay: 'linear-gradient(91.47deg, rgba(218, 69, 143, 0.4) -6%, rgba(218, 52, 221, 0.4) 113.05%)',
      tier: {
        epic: 'linear-gradient(90.13deg, #DD5AFE 0%, #6366F1 100%)',
        mythic: 'linear-gradient(90.13deg, #FE5A5A 0%, #F163D2 100%)',
        legendary: 'linear-gradient(90.13deg, #FE955A 0%, #F1DA63 100%)',
        common: 'linear-gradient(90.13deg, #49DD81 0%, #22B4C6 100%)',
        rare: 'linear-gradient(90deg, #43A6F6 0%, #5868F3 100%)',
      },
    },
  },
});

export default theme;
