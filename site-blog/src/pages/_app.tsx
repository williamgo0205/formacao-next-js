import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Esse arquivo _app executa tanto no client quando no server da aplicação.
// Ele cosnegue configurar onde será feita a renderização do app
export default function App({ Component, pageProps }: AppProps) {  
  return <Component {...pageProps} />;
}
