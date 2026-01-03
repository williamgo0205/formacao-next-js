import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

export const Search = () => {
  const router = useRouter();
  const query = router.query.q as string;

  // Função para quando o cliente digitar uma informação e pressionar a tecla enter seja executada atualizando a URI da página
  const handleSearch = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    if (query.trim()) {
      router.push(`/blog?q=${encodeURIComponent(query)}`);
    }
  }, [query, router]);


  // Função para que quando o cliente for digitando atualize a URI da página
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    router.push(
      `/blog?q=${encodeURIComponent(newQuery)}`,
      undefined,
      {
        shallow: true,
        scroll: false
      }
    )
  }

  return (
    <form onSubmit={handleSearch} className="relative group">
      <SearchIcon
        // "cd" é uma função do shadcn/ui 
        // A função cn é um utilitário usado para compor e combinar classes CSS de forma dinâmica em componentes React a fim de evitar conflitos.
        className={cn(
          'text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 group-focus-within:text-blue-300',
          query ? 'text-blue-300' : ''
        )}
      />

      <input
        type="text"
        placeholder="Buscar"
        className="h-10 w-72 bg-transparent border border-gray-400 pl-9 text-gray-100 rounded-md 
                   text-body-sm outline-none transition-all duration-200 
                   focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-300 
                   placeholder:text-gray-300 placeholder:text-body-sm"
        onChange={handleQueryChange}
      />
    </form>
  )
}