/* Utilizando rotas dinâmicas criando o arquivo - [slug].tsx*/

import { useRouter } from "next/router"

export default function PostPage() {
    const router = useRouter();

    return (
        <div> Componente Post: {router.query.slug} </div>
    )
}