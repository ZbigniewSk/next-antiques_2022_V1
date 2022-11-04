import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { getCookie } from "cookies-next";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import PageProvider from "../src/helpers/PageProvider";
import { StoreProvider } from "../utils/Store";

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
