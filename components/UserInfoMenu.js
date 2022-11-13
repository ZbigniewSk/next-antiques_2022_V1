import { Person } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";

export default function UserInfoMenu() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const data = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    dispatch({ type: "USER_LOGIN", payload: data });
  }, [dispatch]);

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
    <Box
      sx={{
        marginLeft: "20px",
        display: "flex",
      }}
    >
      {userInfo ? (
        <>
          <Button
            variant="text"
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
            <Person sx={{ mr: "10px" }} />
            <span>{userInfo.name}</span>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={loginMenuCloseHandler}
          >
            <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/profile")}>
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
          <Button
            color="success"
            variant="text"
            size="large"
            sx={{
              textTransform: "initial",
              marginRight: "10px",
              height: "40px",
            }}
          >
            <Person sx={{ mr: "10px" }} />
            Login
          </Button>
        </NextLink>
      )}
    </Box>
  );
}
