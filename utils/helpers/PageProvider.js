import MUIThemeProvider from "./MUIThemeProvider";

const PageProvider = ({ children, currentTheme }) => (
  <MUIThemeProvider currentTheme={currentTheme}>{children}</MUIThemeProvider>
);

export default PageProvider;
