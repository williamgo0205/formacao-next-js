import { ShareConfig } from "./social-provider"

type UseShareProps = ShareConfig & {
  clipboardTimeout?: number
}


export const userShare = ({ url, title, text, clipboardTimeout = 2000 }: UseShareProps) => {
  const shareConfig = {
    url,
    ...(title && { title }), //Adiciona o title caso exista posi é opcional
    ...(text && { text }), //Adiciona o text caso exista posi é opcional
  }
  return {}
}