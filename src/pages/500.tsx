import React from "react";
import Head from "next/head";
import ServerError from "@/components/Pages/ServerError";

const Custom500 = () => {
  return (
    <>
      <Head>
        <title>500 | Server Error</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <ServerError />
    </>
  );
};

export default Custom500;
