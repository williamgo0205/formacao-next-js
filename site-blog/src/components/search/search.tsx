import { cn } from "@/lib/utils";
import { CircleX, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useCallback, useEffect, useRef } from "react";

export const Search = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') ?? '';
  const hasQuery = !!searchParams?.has('q');

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
      {
        scroll: false
      }
    )
  }

  // Função para resetar o dado informado no input
  const resetSearch = () => {
    router.push(
      '/blog',
      {
        scroll: false
      }
    )
  }

  // UseEffects utilizado para setar o foco no componente search automatcamente caso o "hasQuery" tenha o valor 'q'
  useEffect(() => {
    if (hasQuery) {
      inputRef.current?.focus()
    }
  }, [hasQuery]);

  return (
    <form onSubmit={handleSearch} className="relative group w-full md:w-60">
      <SearchIcon
        // "cd" é uma função do shadcn/ui 
        // A função cn é um utilitário usado para compor e combinar classes CSS de forma dinâmica em componentes React a fim de evitar conflitos.
        className={cn(
          'text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 group-focus-within:text-blue-300',
          query ? 'text-blue-300' : ''
        )}
      />

      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar"
        value={query}
        className="w-full h-10 md:w-60 bg-transparent border border-gray-400 pl-9 text-gray-100 rounded-md 
                   text-body-sm outline-none transition-all duration-200 
                   focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-300 
                   placeholder:text-gray-300 placeholder:text-body-sm"
        onChange={handleQueryChange}
      />

      {/* Caso exista informação (na constante query, ou seja digitado em tela), o componente CircleX é rendereizado */}
      {query && (
        <CircleX
          className="absolute w-4 h-4 top-1/2 -translate-y-1/2 right-3 text-gray-300"
          onClick={resetSearch}
        />
      )}
    </form>
  )
}