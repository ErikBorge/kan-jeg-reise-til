import Head from "next/head";
import { NextSeo } from "next-seo";

import Main from "../public/components/main/main";

export default function Home({ data }) {
  return (
    <>
      <NextSeo
        title={`Kan jeg reise til...?`}
        description="Finn ut hvor du kan reise uten å havne i karantene når du kommer hjem."
        canonical={`https://www.kanjegreisetil.no/${slug}`}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
        openGraph={{
          url: "https://www.kanjegreisetil.no",
          title: "Kan jeg reise til...?",
          description:
            "Finn ut hvor du kan reise uten å havne i karantene når du kommer hjem.",
        }}
      />
      {data && <Main slug={false} data={data} />}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://www.fhi.no/api/chartdata/excel/series/96079"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
