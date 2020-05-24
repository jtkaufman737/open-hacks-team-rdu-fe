import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
//   typography: {
//     useNextVariants: true,
//   },
  palette: {
    primary: {
      main: 'rgb(51, 97, 167)',
    },
    secondary: {
      main: "#e41111",
    }
  },
  shape: {
    borderRadius: 8,
  }
});

export default theme;