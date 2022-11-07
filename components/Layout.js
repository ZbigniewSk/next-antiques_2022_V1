import {
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { setCookie } from "cookies-next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";

export default function Layout({
  title,
  description,
  children,
  setThemeHandler,
  currentTheme,
  categories,
}) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  console.log("categories", categories);

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
          <Grid container spacing={1}>
            <Grid item md={3} xs={12}>
              <NextLink href="/" passHref>
                <Link underline="none">
                  <Typography
                    sx={{
                      fontFamily: "Romanesco, cursive",
                      fontSize: "3.5rem",
                      // letterSpacing: "0.2rem",
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
            </Grid>
            <Grid item md={9} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "80px",
                }}
              >
                <Box
                  sx={{
                    flexGrow: "1",
                    display: "flex",
                    justifyContent: "center",
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
                <Box
                  sx={{
                    display: { md: "none" },
                    marginLeft: "20px",
                  }}
                >
                  <Button
                    color="success"
                    variant="outlined"
                    sx={{
                      height: "40px",
                      minWidth: "40px",
                      width: "40px",
                      padding: 0,
                    }}
                  >
                    <MenuIcon />
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: { xs: "none", md: "inline-flex" },
                    marginLeft: "20px",
                  }}
                >
                  {userInfo ? (
                    <>
                      <Button
                        variant="outlined"
                        color="success"
                        size="large"
                        sx={{
                          textTransform: "initial",
                          marginRight: "10px",
                          height: "40px",
                          maxWidth: "160px",
                          "& span": {
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        }}
                        onClick={loginClickHandler}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                      >
                        <span>{userInfo.name}</span>
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
                          onClick={(e) =>
                            loginMenuCloseHandler(e, "/order-history")
                          }
                        >
                          Order History
                        </MenuItem>
                        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <NextLink href="/login" passHref>
                      <Button
                        color="success"
                        variant="outlined"
                        size="large"
                        sx={{
                          textTransform: "initial",
                          marginRight: "10px",
                          height: "40px",
                        }}
                      >
                        Login
                      </Button>
                    </NextLink>
                  )}
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
            </Grid>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              {categories.map((category) => (
                <NextLink
                  href={`/category/${category
                    .toLowerCase()
                    .replace(/\s/, "-")}`}
                  passHref
                  key={category}
                >
                  <Link
                    color="secondary"
                    underline="none"
                    sx={{
                      marginRight: "15px",
                      borderBottom: "2px solid transparent",
                      "&:hover": {
                        borderColor: "warning.main",
                      },
                    }}
                  >
                    <Typography sx={{ display: "inline-flex" }}>
                      {category.toUpperCase()}
                    </Typography>
                  </Link>
                </NextLink>
              ))}
            </Box>
          </Grid>
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
