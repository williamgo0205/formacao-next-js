'use client';

import { deleteAppointment } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types/appointment';
import {
  Trash2 as DeleteIcon,
  Pen as EditIcon,
  Loader2 as LoadingIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AppointmentForm } from '../appointment-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

type AppointmentCardProps = {
  appointment: Appointment;
  isFirstInSection?: boolean;
};

export const AppointmentCard = ({
  appointment,
  isFirstInSection = false,
}: AppointmentCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false); // Estado para controlar o processo de exclusão do agendamento

  // Função para lidar com a exclusão do agendamento
  const handleDelete = async () => {
    // Define o estado de exclusão como verdadeiro para indicar que o processo de exclusão está em andamento
    setIsDeleting(true);

    // Chama a função de exclusão do agendamento passando o ID do agendamento a ser excluído
    const reult = await deleteAppointment(appointment.id);

    if (reult?.error) {
      // Se houver um erro durante a exclusão, exibe uma mensagem de erro para o usuário
      toast.error(reult.error);
      return;
    }

    // Exibe uma mensagem de sucesso após a exclusão bem-sucedida
    toast.success('Agendamento excluído com sucesso!');

    // Define o estado de exclusão como falso para indicar que o processo de exclusão foi concluído
    setIsDeleting(false);
  };

  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-[15%_35%_30%_20%] items-center py-3',
        !isFirstInSection && 'border-t border-[#353339]'
      )}
    >
      {/* Div referente ao Horário */}
      <div className="text-leftpr-4 md:pr-0">
        <span className="text-label-small text-content-primary font-semibold">
          {appointment.time}
        </span>
      </div>

      {/* Div referente ao Paciente com nome do pet e tutor juntamente com a descrição do serviço executado (Banho, Consulta)*/}
      <div className="text-right md:text-left md:pr-4">
        <div className="flex items-center justify-end md:justify-start gap-1">
          <span className="text-label-small-size text-content-primary font-semibold">
            {appointment.petName}
          </span>
          <span className="text-paragraph-small-size text-content-secondary">
            /
          </span>
          <span className="text-paragraph-small-size text-content-secondary">
            {appointment.tutorName}
          </span>
        </div>
      </div>

      <div className="text-left pr-4 hidden md:block mt-1 md:mt-0 col-span-2 md:col-span-1">
        <span className="text-paragraph-small-size text-content-secondary">
          {appointment.description}
        </span>
      </div>

      <div className="text-right mt-2 md:mt-0 col-span-2 md:col-span-1 flex justify-end items-center gap-2">
        {/* Botão de edicao do agendamento */}
        <AppointmentForm appointment={appointment}>
          <Button variant="edit" size="icon">
            <EditIcon size={16} />
          </Button>
        </AppointmentForm>

        {/* Botão de exclusão do agendamento */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="remove" size="icon">
              <DeleteIcon size={16} />
            </Button>
          </AlertDialogTrigger>

          {/* Conteúdo do diálogo de alerta */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remover agendamento</AlertDialogTitle>

              <AlertDialogDescription>
                Tem certeza que deseja remover este agendamento? Esta ação não
                pode ser desfeita.
              </AlertDialogDescription>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>

                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting && (
                    <LoadingIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Confirmar remoção
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
