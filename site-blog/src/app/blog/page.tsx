import { BlogList } from "@/templates/blog";
import { allPosts } from "contentlayer/generated";
import type { Metadata } from "next";

// Adicionando as metatags para o projeto
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dicas e estratégias para ipulsionar seu negocio',
  robots: 'index, follow',
  openGraph: {
    title: 'Blog',
    description: 'Dicas e estratégias para ipulsionar seu negocio',
    url: 'https://rocketseat-nextjs-fundamentals.vercel.app/og-image.jpg',
    siteName: 'Site.Set',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://rocketseat-nextjs-fundamentals.vercel.app/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Site.Set'
      }
    ]
  }
}

// Componente poir default é criado como server client
export default function BlogListPages() {
  // Ações sendo realizadas no servidor exclusivamente
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <BlogList posts={sortedPosts} />
  )
}