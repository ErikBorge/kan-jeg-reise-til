import { NextSeo } from "next-seo";
import useSWR from "swr";

//Components
import Main from "../public/components/main/main";

const Page = ({ slug }) => {
  const { data, error } = useSWR(
    "https://www.fhi.no/api/chartdata/excel/series/96079",
    (query) => fetch(query).then((res) => res.json())
  );
  return (
    <>
      {/* <Head>
        <title>{`Kan jeg reise til ${slug}?`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={`Finn ut om du kan reise til ${slug} uten å havne i karantene når du kommer hjem.`}
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16"
          href="/favicon.ico"
        />
      </Head> */}
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
          type: "website",
          url: `https://www.kanjegreisetil.no/${slug}`,
          title: `Kan jeg reise til ${slug}?`,
          description: `Finn ut om du kan reise til ${slug} uten å havne i karantene når du kommer hjem.`,
          images: [{ url: "https://kan-jeg-reise-til.vercel.app/sun.png" }],
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

export async function getStaticProps(context) {
  //   const result = await fetch(
  //     "https://www.fhi.no/api/chartdata/excel/series/96079"
  //   );
  //   const data = await result.json();
  return {
    props: {
      slug: context.params.slug,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      "/Andorra",
      "/andorra",
      "/Azorene",
      "/azorene",
      "/Belgia",
      "/belgia",
      "/Bulgaria",
      "/bulgaria",
      "/Danmark",
      "/danmark",
      "/Estland",
      "/estland",
      "/Færøyene",
      "/færøyene",
      "/Finland",
      "/finland",
      "/Frankrike",
      "/frankrike",
      "/Grønland",
      "/grønland",
      "/Hellas",
      "/hellas",
      "/Irland",
      "/irland",
      "/Island",
      "/island",
      "/Italia",
      "/italia",
      "/Kanariøyene",
      "/kanariøyene",
      "/Kroatia",
      "/kroatia",
      "/Kypros",
      "/kypros",
      "/Latvia",
      "/latvia",
      "/Liechstenstein",
      "/liechstenstein",
      "/Litauen",
      "/litauen",
      "/Luxembourg",
      "/luxembourg",
      "/Madeira",
      "/madeira",
      "/Malta",
      "/malta",
      "/Monaco",
      "/monaco",
      "/Nederland",
      "/nederland",
      "/Norge",
      "/norge",
      "/Polen",
      "/polen",
      "/Portugal",
      "/portugal",
      "/Romania",
      "/romania",
      "/San Marino",
      "/san marino",
      "/Slovakia",
      "/slovakia",
      "/Slovenia",
      "/slovenia",
      "/Spania",
      "/spania",
      "/Storbritannia",
      "/storbritannia",
      "/Sveits",
      "/sveits",
      "/Sverige",
      "/sverige",
      "/Tsjekkia",
      "/tsjekkia",
      "/Tyskland",
      "/tyskland",
      "/Ungarn",
      "/ungarn",
      "/Vatikanstaten",
      "/vatikanstaten",
      "/Østerrike",
      "/østerrike",
      "/Åland",
      "/åland",
    ],
    fallback: true,
  };
}
