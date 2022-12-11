import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import CartButton from "./CartButton";
// import DesktopCategories from "./DesktopCategories";
// import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeButton from "./ThemeButton";
import UserInfoMenu from "./UserInfoMenu";

// const CartButton = dynamic(() => import("./CartButton"));
const DesktopCategories = dynamic(() => import("./DesktopCategories"));
const HamburgerMenu = dynamic(() => import("./HamburgerMenu"));
// const Logo = dynamic(() => import("./Logo"));
// const SearchBar = dynamic(() => import("./SearchBar"));
// const ThemeButton = dynamic(() => import("./ThemeButton"));
// const UserInfoMenu = dynamic(() => import("./UserInfoMenu"));

export default function Layout({ title, description, children, props }) {
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Antique` : "Antique"}</title>
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
              <Logo />
              <Box
                sx={{
                  display: "flex",
                  flexGrow: "1",
                  alignItems: "center",
                  height: "80px",
                }}
              >
                <SearchBar props={props} />
                <UserInfoMenu />
                <CartButton />
                <ThemeButton props={props} />
              </Box>
            </Box>
            <DesktopCategories props={props} />
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
              <HamburgerMenu props={props} />
              <Box sx={{ marginLeft: "15px", flexGrow: "1" }}>
                <Logo />
              </Box>
              <Box sx={{ display: "flex" }}>
                <CartButton />
                <ThemeButton props={props} />
              </Box>
            </Box>
            <Box sx={{ mb: "10px" }}>
              <SearchBar props={props} />
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
        <Typography>All rights reserved. Antique Shop.</Typography>
      </footer>
    </div>
  );
}

// export default dynamic(() => Promise.resolve(Layout), { ssr: false });
