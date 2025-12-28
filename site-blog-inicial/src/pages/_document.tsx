import { Html, Head, Main, NextScript } from "next/document";

// Serve para controlar a estruura inicial do HTML que vem do servidor
// Ele somente é execitado no servidor
export default function Document() {
  console.log('document')
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
