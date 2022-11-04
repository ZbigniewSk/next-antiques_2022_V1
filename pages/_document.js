import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// MyDocument.getServerSideProps = async (ctx) => {
//   const originalRenderPage = ctx.renderPage;
//   const currentTheme = getCookie("darkMode", ctx) || "error";
//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => {
//         return <App {...props} currentTheme={currentTheme} />;
//       },
//     });
//   const initialProps = await Document.getServerSideProps(ctx);
//   return {
//     ...initialProps,
//     currentTheme,
//   };
// };

// MyDocument.getInitialProps = async (ctx) => {
//   const originalRenderPage = ctx.renderPage;
//   // const cache = createEmotionCache();
//   // const { extractCriticalToChunks } = createEmotionServer(cache);
//   const currentTheme = getCookie("darkMode") || "error";

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => {
//         return <App currentTheme={currentTheme} {...props} />;
//       },
//     });

//   const initialProps = await Document.getInitialProps(ctx);
//   // const emotionStyles = extractCriticalToChunks(initialProps.html);
//   // const emotionStyleTags = emotionStyles.styles.map((style) => (
//   //   <style
//   //     data-emotion={`${style.key} ${style.ids.join(" ")}`}
//   //     key={style.key}
//   //     dangerouslySetInnerHTML={{ __html: style.css }}
//   //   />
//   // ));

//   return {
//     ...initialProps,
//     currentTheme,
//   };
// };

// MyDocument.getInitialProps = async (ctx) => {
//   // const sheets = new ServerStyleSheets();
//   // const originalRenderPage = ctx.renderPage;
//   // ctx.renderPage = () => {
//   //   return originalRenderPage({
//   //     enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//   //   });
//   // };
//   const initialProps = await Document.getInitialProps(ctx);
//   return {
//     ...initialProps,
//     // styles: [
//     //   ...React.Children.toArray(initialProps.styles),
//     //   sheets.getStyleElement(),
//     // ],
//   };
// };
