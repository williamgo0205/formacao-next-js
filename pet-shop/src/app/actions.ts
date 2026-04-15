'use server';

import { prisma } from '@/lib/prisma';
import z from 'zod';

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

// *** Server Action para criar um novo agendamento ***
// Esta função é responsável por validar os dados do agendamento,
// verificar se o horário está dentro dos intervalos permitidos e se já existe um agendamento para o horário selecionado.
// Se tudo estiver correto, ela cria um novo agendamento no banco de dados.
export async function createAppointment(data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);

    // Desestruturação para obter a hora do agendamento
    const { scheduleAt } = parsedData;
    const hour = scheduleAt.getHours();

    // verificação do horário permitido para agendamento
    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 19 && hour < 21;

    // Caso o horário não esteja dentro dos intervalos permitidos, retorna um erro
    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamento fora do horário permitido. Por favor, escolha um horário entre 9h-12h, 13h-18h ou 19h-21h.',
      };
    }

    // Verificação de agendamento existente
    const existsAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
      },
    });

    // Caso já exista um agendamento para o horário selecionado, retorna um erro
    if (existsAppointment) {
      return {
        error:
          'Já existe um agendamento para este horário. Por favor, escolha outro horário.',
      };
    }

    // Criação do agendamento no banco de dados
    await prisma.appointment.create({
      data: {
        ...parsedData,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
