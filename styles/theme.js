import { createTheme } from '@material-ui/core';

export default createTheme({
  palette: {
    primary: {
      main: '#CB4426',
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: { color: '#fff' },
    },
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
      },
    },
  },
});
