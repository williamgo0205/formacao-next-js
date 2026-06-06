'use server';

import { prisma } from '@/lib/prisma';
import { calculedPeriod } from '@/utils';
import { revalidatePath } from 'next/cache';
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

    // Cálculo do período do dia com base na hora do agendamento
    const { isMorning, isAfternoon, isEvening } = calculedPeriod(hour);

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

    // Revalida a página para atualizar a lista de agendamentos de forma automatica após a criação de um novo agendamento
    revalidatePath('/');
  } catch (error) {
    console.log(error);

    return {
      error:
        'Ocorreu um erro ao criar o agendamento. Por favor, tente novamente.',
    };
  }
}

// *** Server Action para atualizar um agendamento existente ***
// Esta função é responsável por validar os dados do agendamento,
// verificar se o horário está dentro dos intervalos permitidos e se já existe um agendamento para o horário selecionado
// (excluindo o próprio agendamento que está sendo atualizado).
// Se tudo estiver correto, ela atualiza o agendamento no banco de dados.
export async function updateAppointment(id: string, data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);

    // Desestruturação para obter a hora do agendamento
    const { scheduleAt } = parsedData;
    const hour = scheduleAt.getHours();

    // Cálculo do período do dia com base na hora do agendamento
    const { isMorning, isAfternoon, isEvening } = calculedPeriod(hour);

    // Caso o horário não esteja dentro dos intervalos permitidos, retorna um erro
    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamento fora do horário permitido. Por favor, escolha um horário entre 9h-12h, 13h-18h ou 19h-21h.',
      };
    }

    // Verificação de agendamento existente pelo ID
    const existsAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
        id: {
          not: id,
        },
      },
    });

    // Caso já exista um agendamento para o horário selecionado, retorna um erro
    if (existsAppointment) {
      return {
        error:
          'Já existe um agendamento para este horário. Por favor, escolha outro horário.',
      };
    }

    // Atualização do agendamento no banco de dados
    await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...parsedData,
      },
    });

    // Revalida a página para atualizar a lista de agendamentos de forma automatica após a criação de um novo agendamento
    revalidatePath('/');
  } catch (error) {
    console.log(error);

    return {
      error:
        'Ocorreu um erro ao atualizar o agendamento. Por favor, tente novamente.',
    };
  }
}

//** Server Action para excluir um agendamento existente ***
// Esta função é responsável por excluir um agendamento do banco de dados com base no ID fornecido.
// Após a exclusão, ela revalida a página para atualizar a lista de agendamentos de forma automática.
export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: {
        id,
      },
    });

    // Revalida a página para atualizar a lista de agendamentos de forma automatica após a exclusão de um agendamento
    revalidatePath('/');
  } catch (error) {
    console.log(error);

    return {
      error:
        'Ocorreu um erro ao excluir o agendamento. Por favor, tente novamente.',
    };
  }
}
