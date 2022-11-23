import { CssBaseline, ThemeProvider } from "@mui/material";

import { theme } from "../theme";

const MUIThemeProvider = ({ children, currentTheme }) => {
  return (
    <ThemeProvider theme={theme(currentTheme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
