import { useRouter } from "next/router";

const Slug = ({ url }) => {
  //   const router = useRouter();
  //   const { pid } = router.query;
  //   console.log("pid", pid);
  //   console.log("query", query);
  console.log("url", url);
  return (
    <div>
      <div>this is {url && url}</div>
    </div>
  );
};

export default Slug;

// Slug.getInitialProps = (context) => {
//   const query = context.query;
//   console.log(query); // the param name is the part in [] in your filename
//   return { query }; // you can now access this as this.props.query in your page
// };

export async function getStaticProps(context) {
  //   const res = await fetch(
  //     "https://www.fhi.no/api/chartdata/excel/series/96079"
  //   );
  //   const data = await res.json();
  console.log(context);

  return {
    props: {
      url: context.params.slug,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      "/sverige",
      "/finland",
      // Object variant:
      //   { params: { slug: "sverige" } },
    ],
    fallback: true,
  };
}
