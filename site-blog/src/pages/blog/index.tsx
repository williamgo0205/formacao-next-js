import { BlogList, type BlogListPosps } from "@/templates/blog";
import { allPosts } from "contentlayer/generated";
import { GetStaticProps } from "next";

export default function BlogPage({ posts }: BlogListPosps) {
  return <BlogList posts={posts} />
}

// Renderizando de forma Estática a página de Listagem de posts pois não haverá mudanças e com isso ela pode ser renderizada no BUILD da aplicação
// Static Site Generation (SSG)
export const getStaticProps = (async () => {
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    props: {
      posts: sortedPosts
    },
  }

}) satisfies GetStaticProps<BlogListPosps>;