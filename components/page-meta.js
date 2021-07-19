import Head from "next/head";

const PageMeta = ({ ...props }) => {
  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>Hen</title>
        <meta name="title" content="Hen" />
        <meta
          name="description"
          content="ESM Based React Component Playground"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hen.reaper.im/" />
        <meta property="og:title" content="Hen" />
        <meta
          property="og:description"
          content="ESM Based React Component Playground"
        />
        <meta property="og:image" content="" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hen.reaper.im/" />
        <meta property="twitter:title" content="Hen" />
        <meta
          property="twitter:description"
          content="ESM Based React Component Playground"
        />
        <meta property="twitter:image" content="" />
      </Head>
    </>
  );
};

export default PageMeta;
