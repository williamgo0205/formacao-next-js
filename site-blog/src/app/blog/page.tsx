import { BlogList } from "@/templates/blog";
import { allPosts } from "contentlayer/generated";

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