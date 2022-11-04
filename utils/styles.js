// import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles({
//   navbar: {
//     backgroundColor: '#203040',
//     '& a': {
//       color: '#ffffff',
//       marginLeft: 10,
//     },
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   brand: {
//     fontFamily: 'Comfortaa, cursive',
//     fontWeight: 'bold',
//     fontSize: '2rem',
//   },
//   main: {
//     minHeight: '80vh',
//   },
//   footer: {
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   section: {
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   body: {
//     background: '#121212',
//   },
// });

// export default useStyles;

// import { css } from "@mui/material";

// const navbar = css`
//   background-color: #203040;
//   & a {
//     color: #ffffff;
//     margin-left: 10px;
//   }
// `;
// const grow = css`
//   flex-grow: 1;
// `;
// const brand = css`
//   font-family: Comfortaa, cursive;
//   font-weight: bold;
//   font-size: 2rem;
// `;
// const main = css`
//   min-height: 80vh;
// `;
// const footer = css`
//   margin-top: 10;
//   text-align: center;
// `;
// const section = css`
//   margin-top: 10;
//   margin-bottom: 10;
// `;

// export const classes = { navbar, grow, brand, main, footer, section };

export const classes = {
  navbar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#ffffff",
      marginLeft: "10px",
    },
  },
  grow: {
    flexGrow: 1,
  },
  brand: {
    fontFamily: "Comfortaa, cursive",
    fontWeight: "bold",
    fontSize: "2rem",
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    marginTop: "10px",
    textAlign: "center",
  },
  section: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  form: {
    maxWidth: "800px",
    margin: "0 auto",
    width: "100%",
  },
  navbarButton: {
    color: "#ffffff",
    textTransform: "initial",
  },
  checkoutWizzard: {
    marginTop: "20px",
    marginBottom: "20px",
    backgroundColor: "transparent",
  },
  error: {
    color: "#f04040",
  },
  fullWidth: {
    width: "100%",
  },
};
