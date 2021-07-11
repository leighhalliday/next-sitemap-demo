import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch("https://api.spacexdata.com/v4/capsules");
  const capsules: any[] = await response.json();

  const fields: ISitemapField[] = capsules.map((capsule) => ({
    loc: `https://www.capsules.com/capsules/${capsule.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
