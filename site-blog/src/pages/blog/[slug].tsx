import { PostPage as Post, type PostPageProps } from "@/templates/blog";
import { allPosts } from "contentlayer/generated";
import { GetStaticPaths, GetStaticProps } from "next";

export default function PostPage({ post }: PostPageProps) {
  return <Post post={post} />
}

// Para o Slug (rota dinâmica) é utilizado o "getStaticPaths" senão o NEXT nao reconhece essas rotas gerando erros na aplicação
// Neste exemplo renderizando de forma estática os 5 primeiros posts do site
export const getStaticPaths = (async () => {
  const sortedposts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filtrando os 5 recentes posts
  const recentPosts = sortedposts.slice(0, 5);

  // Adicionando as informações dos paths
  const paths = recentPosts.map((post) => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  }

}) satisfies GetStaticPaths;

// Renderizando de forma Estática a página de Posts pois não haverá mudanças e com isso ela pode ser renderizada no BUILD da aplicação
// Static Site Generation (SSG)
export const getStaticProps = (async (context) => {
  const { slug } = context.params as { slug: string };
  const post = allPosts.find((post) => post.slug == slug);

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }

}) satisfies GetStaticProps;