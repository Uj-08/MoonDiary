import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import AboutComponent from "@/components/Pages/About/About.component";

const AboutMe = () => {
  return (
    <>
      <Head>
        <title>About Me | MoonDiary</title>
        <link rel="canonical" href="https://moondiary.netlify.app/about-me" />
        <meta name="robots" content="index,follow" />
      </Head>
      <AboutComponent />
    </>
  );
};

export default React.memo(AboutMe);

// ✅ Changed from getServerSideProps to getStaticProps
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}, // No props needed here
    // revalidate: 3600, // Optional: regenerate every hour (ISR)
  };
};