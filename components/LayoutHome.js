import {
  ArrowBack,
  DarkMode,
  ExpandLess,
  ExpandMore,
  Home,
  LightMode,
  Menu as MenuIcon,
  Person,
  Search,
  Shop,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

export default function LayoutHome({
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

  //react useState hook to save the current open/close state of the drawer, normally variables dissapear afte the function was executed
  const [open, setOpenDrawer] = useState(false);
  const [expandCategories, setExpandCategories] = useState(false);
  const [expandLogin, setExpandLogin] = useState(false);

  //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setOpenDrawer(open);
    if (!open) {
      setExpandCategories(false);
      setExpandLogin(false);
    }
  };

  const toggleExpandCategories = () => {
    expandCategories ? setExpandCategories(false) : setExpandCategories(true);
  };

  const toggleExpandLogin = () => {
    expandLogin ? setExpandLogin(false) : setExpandLogin(true);
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
          {/* Desktop menu > 900px */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex" }}>
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
              <Box
                sx={{
                  display: "flex",
                  flexGrow: "1",
                  alignItems: "center",
                  height: "80px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: "1",
                    justifyContent: "center",
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
                <Box
                  sx={{
                    marginLeft: "20px",
                    display: "flex",
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
            </Box>
            <Box
              sx={{
                marginBottom: "5px",
                marginTop: "10px",
                display: "flex",
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
                    <Typography>{category.toUpperCase()}</Typography>
                  </Link>
                </NextLink>
              ))}
            </Box>
          </Box>
          {/* Smartphone menu < 900px */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  color="success"
                  variant="outlined"
                  onClick={toggleDrawer(true)}
                  sx={{
                    height: "40px",
                    minWidth: "40px",
                    width: "40px",
                    padding: 0,
                  }}
                >
                  <MenuIcon />
                </Button>
                {/* The outside of drawer */}
                <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                  <Box
                    sx={{
                      p: 2,
                      height: 1,
                      maxWidth: "300px",
                    }}
                  >
                    <ListItemButton onClick={toggleDrawer(false)}>
                      <ListItemIcon>
                        <ArrowBack />
                      </ListItemIcon>
                      <ListItemText>Back</ListItemText>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton href="/">
                      <ListItemIcon>
                        <Home />
                      </ListItemIcon>
                      <ListItemText>Home</ListItemText>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={toggleExpandCategories}>
                      <ListItemIcon
                        sx={{ color: expandCategories && "warning.main" }}
                      >
                        <Shop />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ color: expandCategories && "warning.main" }}
                      >
                        Categories
                      </ListItemText>
                      {expandCategories ? (
                        <ListItemIcon
                          sx={{
                            justifyContent: "flex-end",
                          }}
                        >
                          <ExpandLess color="warning" />
                        </ListItemIcon>
                      ) : (
                        <ListItemIcon
                          sx={{
                            justifyContent: "flex-end",
                          }}
                        >
                          <ExpandMore />
                        </ListItemIcon>
                      )}
                    </ListItemButton>
                    <Divider />
                    {expandCategories && (
                      <>
                        {categories.map((category) => (
                          <div key={category}>
                            <ListItemButton
                              href={`/category/${category
                                .toLowerCase()
                                .replace(/\s/, "-")}`}
                            >
                              <ListItemText>{category}</ListItemText>
                            </ListItemButton>
                            <Divider />
                          </div>
                        ))}
                      </>
                    )}
                    {userInfo ? (
                      <>
                        <ListItemButton onClick={toggleExpandLogin}>
                          <ListItemIcon
                            sx={{ color: expandLogin && "warning.main" }}
                          >
                            <Person />
                          </ListItemIcon>
                          <ListItemText
                            sx={{
                              color: expandLogin && "warning.main",
                              "& span": {
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              },
                            }}
                          >
                            <span>
                              {userInfo.name ? userInfo.name : "User"}
                            </span>
                          </ListItemText>
                          {expandLogin ? (
                            <ListItemIcon
                              sx={{
                                justifyContent: "flex-end",
                              }}
                            >
                              <ExpandLess color="warning" />
                            </ListItemIcon>
                          ) : (
                            <ListItemIcon
                              sx={{
                                justifyContent: "flex-end",
                              }}
                            >
                              <ExpandMore />
                            </ListItemIcon>
                          )}
                        </ListItemButton>
                        <Divider />
                        {expandLogin && (
                          <>
                            <ListItemButton
                              onClick={(e) =>
                                loginMenuCloseHandler(e, "/profile")
                              }
                            >
                              <ListItemText>Profile</ListItemText>
                            </ListItemButton>
                            <Divider />

                            <ListItemButton
                              onClick={(e) =>
                                loginMenuCloseHandler(e, "/order-history")
                              }
                            >
                              <ListItemText>Order History</ListItemText>
                            </ListItemButton>
                            <Divider />

                            <ListItemButton onClick={logoutClickHandler}>
                              <ListItemText>Logout</ListItemText>
                            </ListItemButton>
                            <Divider />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <ListItemButton href="/login">
                          <ListItemIcon>
                            <Person />
                          </ListItemIcon>
                          <ListItemText>Login</ListItemText>
                        </ListItemButton>
                        <Divider />
                      </>
                    )}
                    <ListItemButton href="/cart">
                      <ListItemIcon>
                        {cart.cartItems.length > 0 ? (
                          <Badge badgeContent={cart.cartItems.length}>
                            <ShoppingCart />
                          </Badge>
                        ) : (
                          <ShoppingCart />
                        )}
                      </ListItemIcon>
                      <ListItemText>Cart Items</ListItemText>
                    </ListItemButton>
                    <Divider />
                  </Box>
                </Drawer>
              </Box>
              <Box sx={{ marginLeft: "15px", flexGrow: "1" }}>
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
                  <Button color="success" size="large" sx={{ paddingRight: 0 }}>
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
                  sx={{ paddingRight: 0 }}
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
