import {
  ArrowBack,
  ExpandLess,
  ExpandMore,
  Home,
  Menu as MenuIcon,
  Person,
  Shop,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { convertCategoryToUrl } from '../utils/common';

export default function HamburgerMenu({ props }) {
  const { products } = props;
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  useEffect(() => {
    const data = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    dispatch({ type: "SAVE_CART_ITEMS", payload: data });
  }, []);

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

  const loginMenuCloseHandler = (e, redirect) => {
    toggleDrawer(false);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    toggleDrawer(false);
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    router.push("/");
  };

  const Categories = () => {
    if (!products) {
      return <div></div>;
    }

    const oneProductForEachCategory = products.reduce(
      (previousValue, currentValue) => {
        if (!Array.isArray(previousValue)) {
          previousValue = [].concat(previousValue);
        }
        if (
          previousValue.find(
            (value) => value.category === currentValue.category
          )
        )
          return previousValue;
        return previousValue.concat(currentValue);
      }
    );

    const categories = [
      ...oneProductForEachCategory.map((product) => product.category),
    ];

    return (
      <>
        <ListItemButton onClick={toggleExpandCategories}>
          <ListItemIcon sx={{ color: expandCategories && "warning.main" }}>
            <Shop />
          </ListItemIcon>
          <ListItemText sx={{ color: expandCategories && "warning.main" }}>
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
                  href={`/category/${convertCategoryToUrl(category)}`}
                >
                  <ListItemText>{category}</ListItemText>
                </ListItemButton>
                <Divider />
              </div>
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        color="success"
        variant="text"
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
          <Categories />
          {userInfo ? (
            <>
              <ListItemButton onClick={toggleExpandLogin}>
                <ListItemIcon sx={{ color: expandLogin && "warning.main" }}>
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
                  <span>{userInfo.name ? userInfo.name : "User"}</span>
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
                    onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                  >
                    <ListItemText>Profile</ListItemText>
                  </ListItemButton>
                  <Divider />

                  <ListItemButton
                    onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
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
  );
}
