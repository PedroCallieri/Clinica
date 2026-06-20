import type { Prontuario, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ProntuarioRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listarProntuario() {
    const prontuarios = await prisma.prontuario.findMany();
    return prontuarios;
  }

  async buscarProntuarioId(idProntuario: number) {
    const prontuario = await prisma.prontuario.findUnique({
      where: {
        id: idProntuario,
      },
    });
    return prontuario;
  }

  async createProntuario(dadosProntuario: Partial<Prontuario>) {
    return await prisma.prontuario.create({
      data: {
        descricao: dadosProntuario.descricao || "",
        data: dadosProntuario.data || null,
        medicoResponsavelId: dadosProntuario.medicoResponsavelId || 0,
        pacienteId: dadosProntuario.pacienteId || 0,
      },
    });
  }

  async atualizarProntuario(idProntuario: number, dadosParaAtualizar: Omit<Prontuario, "id">) {
    const prontuarioAtualizado = await prisma.prontuario.update({
      data: {
        ...dadosParaAtualizar,
      },
      where: {
        id: idProntuario,
      },
    });
    return prontuarioAtualizado;
  }

  async deletarProntuarioId(idProntuario: number) {
    const prontuario = await prisma.prontuario.delete({
      where: {
        id: idProntuario,
      },
    });
    return prontuario;
  }
}

export const prontuarioRepository = new ProntuarioRepository(prisma);