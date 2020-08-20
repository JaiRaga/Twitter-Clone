import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#dc004e"
    },
    error: {
      main: red.A400
    },
    update: {
      main: "#6a197d"
    },
    background: {
      default: "#fff"
    }
  }
});

export default theme;
