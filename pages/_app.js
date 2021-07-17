import { NProgress } from "components/nprogress";

import "highlight.js/styles/ascetic.css";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NProgress />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
