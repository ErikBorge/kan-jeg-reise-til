import Head from "next/head";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import Main from "../public/components/main/main";
import { getDateXDaysFromNow } from "../public/util/util";
import Splash from "../public/components/splash/splash";
import useSWR from "swr";
import { useCookies } from "react-cookie";
import ThankYouModal from "../public/components/thankyouModal/thankyouModal";
import EUdata from "../public/assets/europe-data.json";

export default function Home({}) {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["hasBeenHereBefore"]);
  const [hasBeenHereBefore, setHasBeenHereBefore] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(true);
  const [data] = useState({
    config: EUdata.config,
    data: [EUdata.data[12]],
  });

  // const { data, error } = useSWR(
  //   "https://www.fhi.no/api/chartdata/excel/series/96079",
  //   // "https://www.fhi.no/api/chartdata/excel/series/104110/latest",
  //   (query) => fetch(query).then((res) => res.json())
  // );
  // console.log(data);
  // console.log("eudata", EUdata);

  useEffect(() => {
    if (!cookies.hasBeenHereBefore) {
      setCookie("hasBeenHereBefore", true, {
        expires: getDateXDaysFromNow(90),
      });
    } else {
      setHasBeenHereBefore(true);
    }
  }, []);

  // if (error) {
  //   return "something went wrong";
  // }
  return (
    <>
      <NextSeo
        title={`Kan jeg reise til...?`}
        description="Finn ut hvor du kan reise uten å havne i karantene når du kommer hjem."
        canonical="https://www.kanjegreisetil.no/"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
        openGraph={{
          type: "website",
          site_name: "Kan jeg reise til...?",
          url: "https://www.kanjegreisetil.no",
          title: "Kan jeg reise til...?",
          description:
            "Finn ut hvor du kan reise uten å havne i karantene når du kommer hjem.",
          images: [{ url: "https://kan-jeg-reise-til.vercel.app/sun.png" }],
        }}
      />
      {data && typeof window !== "undefined" && (
        <Main
          slug={false}
          data={data}
          isLoading={isLoading}
          isThankYouOpen={isThankYouOpen}
        >
          {isThankYouOpen && (
            <ThankYouModal
              isLoading={isLoading}
              isThankYouOpen={isThankYouOpen}
              setIsThankYouOpen={setIsThankYouOpen}
            />
          )}
          {isLoading && !isThankYouOpen && (
            <Splash
              setIsLoading={setIsLoading}
              hasBeenHereBefore={hasBeenHereBefore}
            />
          )}
        </Main>
      )}
    </>
  );
}

export async function getStaticProps() {
  // const res = await fetch(
  //   "https://www.fhi.no/api/chartdata/excel/series/96079"
  // );
  // const data = await res.json();

  return {
    props: {},
  };
}
