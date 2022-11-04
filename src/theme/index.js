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
    primary: { main: "#c93dd9" },
    secondary: { main: "#34ebe5" },
    grey: { main: "#5c5b5c" },

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
    primary: { main: "#c93dd9" },
    secondary: { main: "#34ebe5" },
    grey: { main: "#cccccc" },
    mode: "dark",
  },
});

// export const globalStyles = css`
//   :root {
//     body {
//       background-color: #fff;
//       color: #121212;
//     }
//   }
//   [data-theme="dark"] {
//     body {
//       background-color: #121212;
//       color: #fff;
//     }
//   }
// `;

// export const globalStyles = {
//   ":root": {
//     body: {
//       backgroundColor: "#fff",
//       color: "#121212",
//     },
//   },
//   "[data-theme='dark']": {
//     body: {
//       backgroundColor: "#121212",
//       color: "#fff",
//     },
//   },
// };
