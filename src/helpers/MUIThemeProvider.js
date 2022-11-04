import { CssBaseline, ThemeProvider } from "@mui/material";
// import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "../theme";

const MUIThemeProvider = ({ children, currentTheme }) => {
  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {/* <GlobalStyles styles={globalStyles} /> */}
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
