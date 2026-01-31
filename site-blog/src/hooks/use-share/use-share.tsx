import { Link2 } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useClipboard } from "../use-clipboard";
import { ShareConfig, SOCIAL_PROVIDERS, SocialProvider } from "./social-providers";

type UseShareProps = ShareConfig & {
  clipboardTimeout?: number;
};

export const useShare = ({ url, title, text, clipboardTimeout = 2000 }: UseShareProps) => {
  // Utilizando o clipboard
  const { isCopied, handleCopy } = useClipboard({ timeout: clipboardTimeout });

  // useMemo - Função de memória do React
  const shareConfig = useMemo(() => ({
    url,
    ...(title && { title }), //Adiciona o title caso exista posi é opcional
    ...(text && { text }), //Adiciona o text caso exista posi é opcional
  }), [url, title, text]);


  // useCallback - Função de memória do React para callback
  const share = useCallback(async (provider: SocialProvider) => {
    try {
      if (provider === 'clipboard') {
        return await handleCopy(url)
      }

      const providerConfig = SOCIAL_PROVIDERS[provider];

      if (!providerConfig) {
        throw new Error(`Provider não suportado: ${provider}`);
      }

      const shareUrl = providerConfig.shareUrl(shareConfig);

      const shareWindow = window.open(
        shareUrl,
        '_blank',
        'width=600, height=600, location=yes, status=yes'
      );

      return !!shareWindow;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, [shareConfig, handleCopy, url]);

  const shareButtons = useMemo(() => [
    ...Object.entries(SOCIAL_PROVIDERS).map(([key, provider]) => ({
      provider: key,
      name: provider.name,
      icon: provider.icon,
      action: () => share(key as SocialProvider),
    })),
    {
      provider: 'clipboard',
      name: isCopied ? 'Link copiado!' : 'Copiar link',
      icon: <Link2 className="h-4 w-4" />,
      action: () => share('clipboard')
    }
  ], [isCopied, share]);

  return { shareButtons }
};