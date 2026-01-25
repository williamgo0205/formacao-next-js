type PostCardProps = {
  children: React.ReactNode;
}

export const PostGridCard = ({ children }: PostCardProps) => {
  return (
    /* 
      Essa div é responsável por criar o grid para a exibição dos posts:
      1 coluna (mobile)
      2 colunas (tablet por exemplo com tamanho medio - md)
      3 colunas (desktop por exemplo com tamnanho grande - lg)
    */
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  )
}