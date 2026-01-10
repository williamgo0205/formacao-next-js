import { Search } from "@/components/search";
import { allPosts } from "contentlayer/generated";
import { useRouter } from "next/router";
import { PostCard } from "./components/post-card";
import { PostGridCard } from "./components/post-grid-card";

export function BlogList() {
  const router = useRouter();
  const query = router.query.q as string;
  const pageTitle = query
    ? `Resultados de Busca para "${query}"`
    : 'Dicas e estratégias para impulsionar seu negócio';

  const posts = allPosts;

  return (
    <div className="flex flex-col py-24 flex-grow h-full">
      <header className="pb-16">
        <div className="container space-y-6 flex flex-col items-start justify-between md:flex-row md:items-end lg:items-end">
          <div className="flex flex-col gap-4 md:px-0">
            {/* TAG */}
            <span className="text-body-tag text-cyan-100 w-fit rounded-md text-center md:text-left py-2 px-4 bg-cyan-300">
              BLOG
            </span>

            {/* Título  */}
            <h1 className="text-balance text-start md:text-left text-heading-lg md:text-heading-xl max-w-2xl text-gray-100">
              {pageTitle}
            </h1>
          </div>

          {/* Search */}
          <Search />
        </div>
      </header>

      {/* Listagens de Posts*/}
      <PostGridCard>
        {/* Iteração para os posts */}
        {posts.map((post) =>
          <PostCard
            key={post._id}
            title={post.title}
            description={post.description}
            date={new Date(post.date).toLocaleDateString("pt-BR")}
            image={post.image.trim()}
            slug={post.slug}
            author={{
              avatar: post.author.avatar.trim(),
              name: post.author.name
            }}
          />
        )}
      </PostGridCard>
    </div>
  );
}
