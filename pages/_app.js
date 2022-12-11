import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { getCookie } from "cookies-next";
import { Router } from "next/router";
import { SnackbarProvider } from "notistack";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { useState } from "react";
import PageProvider from "../utils/helpers/PageProvider";
import { StoreProvider } from "../utils/Store";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function App(props) {
  const { Component, pageProps, initialTheme } = props;
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const setThemeHandler = (v) => setCurrentTheme(v);
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          <PageProvider currentTheme={currentTheme}>
            <Component
              {...pageProps}
              setThemeHandler={setThemeHandler}
              currentTheme={currentTheme}
            />
          </PageProvider>
        </PayPalScriptProvider>
      </StoreProvider>
    </SnackbarProvider>
  );
}

App.getInitialProps = async ({ ctx }) => {
  return {
    initialTheme: getCookie("darkMode", ctx)
      ? await JSON.parse(getCookie("darkMode", ctx))
      : "light",
  };
};

export default App;
