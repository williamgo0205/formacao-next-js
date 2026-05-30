'use client';

import { addDays, format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger } from '../ui/popover';

export const DatePicker = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateParam = searchParams.get('date');

  // A função getInicialDate é definida usando o hook useCallback para memorizar a função e evitar que ela seja recriada em cada renderização,
  // a menos que a dependência dateParam mude.
  const getInicialDate = useCallback(() => {
    if (!dateParam) return;

    // desestruturando a data para obter o ano, mês e dia, e convertendo cada parte para um número usando map(Number)
    const [year, month, day] = dateParam.split('-').map(Number);

    // Criando um objeto Date usando o ano, mês e dia (mês é subtraído por 1 porque os meses em JavaScript são indexados a partir de 0)
    const pasedDate = new Date(year, month - 1, day);

    // Verificando se a data é válida usando a função isValid do date-fns. Se a data for inválida, retorna a data atual.
    if (!isValid(pasedDate)) return new Date();

    // Se a data for válida, retorna a data convertida.
    return pasedDate;
  }, [dateParam]);

  // O estado date é inicializado com a função getInicialDate, que retorna a data convertida a partir do parâmetro
  // de busca ou a data atual se o parâmetro for inválido ou não for fornecido.
  const [date, setDate] = useState<Date | undefined>(getInicialDate);

  // O estado isPopoverOpen é usado para controlar se o popover do seletor de data está aberto ou fechado.
  // Ele é inicializado como false, indicando que o popover está fechado por padrão.
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // A função updateURLWithDate é responsável por atualizar a URL com a data selecionada.
  // Ela recebe a data selecionada como argumento e, se a data for válida,
  const updateURLWithDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    // Criando um novo objeto URLSearchParams a partir dos parâmetros de busca atuais para manipular os parâmetros da URL.
    const newParams = new URLSearchParams(searchParams.toString());

    // Formatando a data selecionada para o formato 'yyyy-MM-dd' usando a função format do date-fns e definindo
    // o parâmetro 'date' na URL com a data formatada.
    newParams.set('date', format(selectedDate, 'yyyy-MM-dd'));

    // Usando o método push do roteador do Next.js para navegar para a nova URL com os parâmetros atualizados,
    // o que efetivamente atualiza a URL no navegador e pode acionar uma nova renderização da página com a nova data.
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // A função handleNavigateDay é responsável por navegar para um dia específico,
  // adicionando ou subtraindo um número de dias da data atual.
  const handleNavigateDay = (days: number) => {
    const newDate = addDays(date || new Date(), days);
    updateURLWithDate(newDate);
  };

  // O hook useEffect é usado para sincronizar o estado date com o parâmetro de busca dateParam.
  useEffect(() => {
    const newDate = getInicialDate();

    // Se a nova data obtida a partir do parâmetro de busca for diferente da data atual no estado,
    // atualiza o estado date com a nova data.
    if (date?.getTime() !== newDate?.getTime()) {
      setDate(newDate);
    }
  }, [dateParam, getInicialDate]);

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => handleNavigateDay(-1)}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-min[180px] justify-between text-left font-normal bg-transparent border-border-primary text-content-primary 
                       hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 
                       focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-content-brand" />
              {date ? (
                format(date, 'PPP', { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
      </Popover>

      <Button variant="outline" onClick={() => handleNavigateDay(1)}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
