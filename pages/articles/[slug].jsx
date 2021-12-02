import { MDXRemote } from "next-mdx-remote";
import components from "../../features/mdx-components";
import ArticleLayout from "../../layouts/article-layout";
import { getSlugs } from "../../utils/file-browsers";
import { getContentBySlug } from "../../utils/queries";

export default function Article({ mdxSource, frontMatter }) {
  return (
    <ArticleLayout article={frontMatter}>
      <MDXRemote {...mdxSource} components={components} />
    </ArticleLayout>
  );
}

export async function getStaticPaths() {
  const slugs = await getSlugs("articles");

  return {
    paths: slugs.map((p) => ({ params: { slug: p } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getContentBySlug("articles", params.slug);
  return { props: { ...post } };
}
