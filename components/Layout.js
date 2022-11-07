import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Button,
  Container,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { setCookie } from "cookies-next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { classes } from "../utils/styles";

export default function Layout({
  title,
  description,
  children,
  setThemeHandler,
  currentTheme,
}) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

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

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    router.push("/");
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Shoppo` : "Shoppo"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <AppBar position="static" sx={classes.navbar} color="primary">
        <Toolbar>
          <NextLink href="/" passHref>
            <Link underline="none">
              <Typography sx={classes.brand} color="secondary">
                fancy Clogs
              </Typography>
            </Link>
          </NextLink>
          <div style={classes.grow}></div>
          <div style={classes.navBarContainer}>
            {userInfo ? (
              <>
                <Button
                  variant="outlined"
                  color="success"
                  sx={classes.navbarButton}
                  onClick={loginClickHandler}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
                  >
                    Order History
                  </MenuItem>
                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <NextLink href="/login" passHref>
                <Button color="success" variant="outlined">
                  Login
                </Button>
              </NextLink>
            )}
            <NextLink href="/cart" passHref>
              <Button color="success">
                {cart.cartItems.length > 0 ? (
                  <Badge badgeContent={cart.cartItems.length}>
                    <ShoppingCart />
                  </Badge>
                ) : (
                  <ShoppingCart />
                )}
              </Button>
            </NextLink>

            <Button color="success" onClick={darkModeChangeHandler}>
              {currentTheme === "light" ? <DarkMode /> : <LightMode />}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container sx={classes.main}>{children}</Container>
      <footer style={classes.footer}>
        <Typography>All rights reserved. Fancy Clogs.</Typography>
      </footer>
    </div>
  );
}
