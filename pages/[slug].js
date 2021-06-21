import Head from "next/head";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";

//Components
import Main from "../public/components/main/main";

const Page = ({ slug, data }) => {
  //   const router = useRouter();
  //   const homeString = `${slug}-home`;
  //   useEffect(() => {
  //     if (slug) {
  //       router.push("/", homeString);
  //     }
  //   }, [slug]);

  return (
    <>
      <NextSeo
        title={`Kan jeg reise til ${slug}?`}
        description={`Finn ut om du kan reise til ${slug} uten å havne i karantene når du kommer hjem.`}
        canonical={`https://www.kanjegreisetil.no/${slug}`}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
        openGraph={{
          url: `https://www.kanjegreisetil.no/${slug}`,
          title: `Kan jeg reise til ${slug}?`,
          description: `Finn ut om du kan reise til ${slug} uten å havne i karantene når du kommer hjem.`,
        }}
      />

      {data && <Main slug={slug} data={data} />}
    </>
  );
};

export default Page;

// Slug.getInitialProps = (context) => {
//   const query = context.query;
//   console.log(query); // the param name is the part in [] in your filename
//   return { query }; // you can now access this as this.props.query in your page
// };

// export async function getServerSideProps(context) {
//   return {
//     props: { url: context.params.slug }, // will be passed to the page component as props
//   };
// }

export async function getStaticProps({ params, res }) {
  const result = await fetch(
    "https://www.fhi.no/api/chartdata/excel/series/96079"
  );
  const data = await result.json();

  return {
    props: {
      slug: params.slug,
      data,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      "/Andorra",
      "/Azorene",
      "/Belgia",
      "/Bulgaria",
      "/Danmark",
      "/Estland",
      "/Færøyene",
      "/Finland",
      "/Frankrike",
      "/Grønland",
      "/Hellas",
      "/Irland",
      "/Island",
      "/Italia",
      "/Kanariøyene",
      "/Kroatia",
      "/Kypros",
      "/Latvia",
      "/Liechstenstein",
      "/Litauen",
      "/Luxembourg",
      "/Madeira",
      "/Malta",
      "/Monaco",
      "/Nederland",
      "/Norge",
      "/Polen",
      "/Portugal",
      "/Romania",
      "/San%20Marino",
      "/Slovakia",
      "/Slovenia",
      "/Spania",
      "/Storbritannia",
      "/Sveits",
      "/Sverige",
      "/Tsjekkia",
      "/Tyskland",
      "/Ungarn",
      "/Vatikanstaten",
      "/Østerrike",
      "/Åland",
    ],
    fallback: true,
  };
}
