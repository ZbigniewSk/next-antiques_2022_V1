import { DarkMode, LightMode } from "@mui/icons-material";
import { Button } from "@mui/material";
import { setCookie } from "cookies-next";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";

export default function ThemeButton({ props }) {
  const { setThemeHandler, currentTheme } = props;
  const { dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type:
        currentTheme === "dark" ? "CURRENT_THEME_DARK" : "CURRENT_THEME_LIGHT",
    });
    setCookie("darkMode", JSON.stringify(currentTheme));
  }, [currentTheme, dispatch]);

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
    <Button color="success" size="large" onClick={darkModeChangeHandler}>
      {currentTheme === "light" ? <DarkMode /> : <LightMode />}
    </Button>
  );
}
