import { createTheme } from "@mui/material";

export const DEFAULT_THEME = "light";

export const lightTheme = createTheme({
  typography: {
    h1: {
      fontSize: "1.6rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
    h2: {
      fontSize: "1.4rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
    body1: {
      fontWeight: "normal",
    },
  },

  palette: {
    primary: { main: "#FAF8F9" },
    secondary: { main: "#000" },
    success: { main: "#0A85FF" },
    warning: { main: "#ff0a0a" },
    grey: { main: "#5c5b5c" },
    background: {
      default: "#F4F2F2",
      paper: "#FAF8F9",
    },
    mode: "light",
  },
});

export const darkTheme = createTheme({
  typography: {
    h1: {
      fontSize: "1.6rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
    h2: {
      fontSize: "1.4rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
    body1: {
      fontWeight: "normal",
    },
  },
  palette: {
    primary: { main: "#5E6463" },
    secondary: { main: "#fff" },
    success: { main: "#0AFFFF" },
    warning: { main: "#D92D2D" },
    grey: { main: "#cccccc" },
    // background: {
    //   default: "#3C3839",
    //   paper: "#504B4C",
    // },
    mode: "dark",
  },
});
