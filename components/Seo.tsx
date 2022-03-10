import Head from "next/head";
import React, { FunctionComponent } from "react";

type Props = {
  title: string;
};

const Seo: FunctionComponent<Props> = ({ title }) => {
  const fullTitle = `${title} • SkillZ`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} key="og:title" />
      <meta name="twitter:title" content={fullTitle} key="twitter:title" />
    </Head>
  );
};

export default Seo;
