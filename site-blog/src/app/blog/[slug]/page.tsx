import { PostPage } from "@/templates/blog";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

type BlogPostPage = {
  params: Promise<{
    slug: string;
  }>
}

// Transformando o componente em ISR (Incremental Static Regeneration) 

// Intervalo para regetar apágina sem a necessidade do rebuild da aplicação
export const revalidate = 60;

// A flag estando true significa que se o usuário tentar acessar um post inexistente no momento a aplicaçãovai tentar buscar esse post
// Caso seja false vai retornar erro 404
export const dynamicParams = true;

// Função de retorno de um array de slug
export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug
  }));
}

export default async function BlogPostPage({ params }: BlogPostPage) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <PostPage post={post} />
  )
}