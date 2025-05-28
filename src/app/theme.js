'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#017FFF',      // brand‑blue
      light: '#63a4ff',
      dark:  '#004ba0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',      // brand‑purple
    },
    // You can add any extra slot
    success: {
      main: '#2e7d32',
    },
    // Or create your own named palette slot
    infoAlt: {
      main: '#0288d1',
    },
    background: {
      default: '#F9F9F9',
      paper:   '#fff',
    },
    text: {
      primary:   '#212121',
      secondary: '#616161',
    },
  },
  typography: {
    fontFamily: `'Nunito', 'sans-serif'`,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            }
          ],
        },
      },
    },
  },
});

export default theme;