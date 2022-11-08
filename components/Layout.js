import { DarkMode, LightMode, Search, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { setCookie } from "cookies-next";
import Head from "next/head";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";

export default function Layout({
  title,
  description,
  children,
  setThemeHandler,
  currentTheme,
}) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  useEffect(() => {
    dispatch({
      type:
        currentTheme === "dark" ? "CURRENT_THEME_DARK" : "CURRENT_THEME_LIGHT",
    });
    setCookie("darkMode", JSON.stringify(currentTheme));
  }, [currentTheme, dispatch]);

  useEffect(() => {
    const data = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    dispatch({ type: "CART_INITIAL_ITEMS", payload: data });
  }, [dispatch]);

  useEffect(() => {
    const data = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    dispatch({ type: "USER_LOGIN", payload: data });
  }, [dispatch]);

  const darkModeChangeHandler = () => {
    const newCurrentTheme = currentTheme === "light" ? "dark" : "light";
    dispatch({
      type:
        newCurrentTheme === "dark"
          ? "CURRENT_THEME_DARK"
          : "CURRENT_THEME_LIGHT",
    });
    setCookie("darkMode", JSON.stringify(newCurrentTheme));
    setThemeHandler(newCurrentTheme);
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Fancy Clogs` : "Fancy Clogs"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <AppBar
        position="static"
        sx={{
          minHeight: "100px",
          boxShadow: "none",
          borderBottom: "1px solid #B0BAB8",
        }}
        color="primary"
      >
        <Toolbar>
          {/* Display > 900px */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ marginLeft: "10px", marginRight: "20px" }}>
              <NextLink href="/" passHref>
                <Link underline="none">
                  <Typography
                    sx={{
                      fontFamily: "Romanesco, cursive",
                      fontSize: "3.5rem",
                      color: "warning.main",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      height: "80px",
                    }}
                    color="secondary"
                  >
                    Fancy Clogs
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexGrow: "1",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TextField
                placeholder="Search..."
                fullWidth
                variant="outlined"
                size="small"
                id="search"
                inputProps={{ type: "search" }}
                color="success"
                sx={{
                  maxWidth: "500px",
                  height: "40px",
                  [`& fieldset`]: {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                }}
              ></TextField>
              <Button
                color="success"
                variant="outlined"
                sx={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  height: "40px",
                  minWidth: "40px",
                  width: "40px",
                }}
              >
                <Search />
              </Button>
            </Box>

            <Box sx={{ display: "flex" }}>
              <NextLink href="/cart" passHref>
                <Button color="success" size="large">
                  {cart.cartItems.length > 0 ? (
                    <Badge badgeContent={cart.cartItems.length}>
                      <ShoppingCart />
                    </Badge>
                  ) : (
                    <ShoppingCart />
                  )}
                </Button>
              </NextLink>
              <Button
                color="success"
                size="large"
                onClick={darkModeChangeHandler}
              >
                {currentTheme === "light" ? <DarkMode /> : <LightMode />}
              </Button>
            </Box>
          </Box>
          {/* Display < 900px */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ marginLeft: "10px", marginRight: "10px" }}>
                <NextLink href="/" passHref>
                  <Link underline="none">
                    <Typography
                      sx={{
                        fontFamily: "Romanesco, cursive",
                        fontSize: "3.5rem",
                        color: "warning.main",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        height: "80px",
                      }}
                      color="secondary"
                    >
                      Fancy Clogs
                    </Typography>
                  </Link>
                </NextLink>
              </Box>
              <Box sx={{ display: "flex" }}>
                <NextLink href="/cart" passHref>
                  <Button color="success" size="large">
                    {cart.cartItems.length > 0 ? (
                      <Badge badgeContent={cart.cartItems.length}>
                        <ShoppingCart />
                      </Badge>
                    ) : (
                      <ShoppingCart />
                    )}
                  </Button>
                </NextLink>
                <Button
                  color="success"
                  size="large"
                  onClick={darkModeChangeHandler}
                >
                  {currentTheme === "light" ? <DarkMode /> : <LightMode />}
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexGrow: "1",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: "10px",
              }}
            >
              <TextField
                placeholder="Search..."
                fullWidth
                variant="outlined"
                size="small"
                id="search"
                inputProps={{ type: "search" }}
                color="success"
                sx={{
                  maxWidth: "500px",
                  height: "40px",
                  [`& fieldset`]: {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                }}
              ></TextField>
              <Button
                color="success"
                variant="outlined"
                sx={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  height: "40px",
                  minWidth: "40px",
                  width: "40px",
                }}
              >
                <Search />
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ minHeight: "80vh" }}>{children}</Container>
      <footer
        style={{
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        <Typography>All rights reserved. Fancy Clogs.</Typography>
      </footer>
    </div>
  );
}
