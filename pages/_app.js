import { NProgress } from "components/nprogress";
import PageMeta from "components/page-meta";

import "highlight.js/styles/ascetic.css";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NProgress />
      <PageMeta />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
