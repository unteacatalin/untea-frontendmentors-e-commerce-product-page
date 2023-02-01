import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(26, 100%, 55%)',
    },
    secondary: {
      main: 'hsl(25, 100%, 94%)',
    },
    common: {
      orange: 'hsl(26, 100%, 55%)',
      pale_orange: 'hsl(25, 100%, 94%)',
      very_dark_blue: 'hsl(220, 13%, 13%)',
      dark_grayish_blue: 'hsl(219, 9%, 45%)',
      grayish_blue: 'hsl(220, 14%, 75%)',
      light_grayish_blue: 'hsl(223, 64%, 98%)',
      white: 'hsl(0, 0%, 100%)',
      black_for_lightbox_background: 'hsl(0, 0%, 0%)',
    },
  },
  typography: {
    fontFamily: '"Kumbh Sans", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.8rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '0.9rem',
      fontWeight: 700,
    },
    body: {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920,
    },
  },
});

export default theme;
