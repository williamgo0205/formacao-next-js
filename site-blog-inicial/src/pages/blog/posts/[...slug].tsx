/* Utilizando catch all segments criando o arquivo - [...slug].tsx*/

import { useRouter } from "next/router"

export default function PostPage() {
    const router = useRouter();
    const segments = router.query.slug as string[];

    return (
        <div> Componente Post: {segments?.join('/')} </div>
    )
}