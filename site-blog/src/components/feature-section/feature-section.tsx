import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

export const FeatureSection = () => {
  return (
    <section className="container bg-gray-700 grid gap-6 md:grid-cols-2 pb-8 pt-8 md:py-10">
      <div className="flex flex-col gap-2 rounded-lg p-6 bg-gray-500 md:p-12">
        <span className="text-body-tag text-blue-200 bg-blue-400 px-2 py-1 w-fit rounded-sm uppercase">
          Simples
        </span>
        <h2 className="text-gray-100 text-heading-lg">
          Crie um catálogo de produtos online em poucos minutos
        </h2>
      </div>

      <div className="flex flex-col gap-2 rounded-lg p-6 bg-gray-500 md:p-12">
        <span className="text-body-tag text-blue-200 bg-blue-400 px-2 py-1 w-fit rounded-sm uppercase">
          Prático
        </span>
        <h2 className="text-gray-100 text-heading-lg">
          Venda para seu público através de uma plataforma única
        </h2>
      </div>

      <div className="flex flex-col gap-2 rounded-lg p-6 bg-gray-500 md:p-12">
        <span className="text-body-tag text-blue-200 bg-blue-400 px-2 py-1 w-fit rounded-sm uppercase">
          Personalizável
        </span>

        <h2 className="text-gray-100 text-heading-lg">
          Tenha uma loja online personalizada com a cara da sua marca
        </h2>

        <Button className="rounded-full w-fit" asChild>
          <Link href="/cria-loja">
            Criar loja grátis
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>

    // Faltando 12:27 minutos da aula - Seção: Feature

  )
}