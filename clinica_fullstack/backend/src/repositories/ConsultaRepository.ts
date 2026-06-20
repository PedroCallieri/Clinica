import type { Consulta, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ConsultaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listarConsulta() {
    const consultas = await prisma.consulta.findMany();
    return consultas;
  }

  async buscarConsultaId(idConsulta: number) {
    const consulta = await prisma.consulta.findUnique({
      where: {
        id: idConsulta,
      },
    });
    return consulta;
  }

  async createConsulta(dadosConsulta: Partial<Consulta>) {
    return await prisma.consulta.create({
      data: {
        motivo: dadosConsulta.motivo || "",
        dataConsulta: dadosConsulta.dataConsulta || new Date(),
        observacoes: dadosConsulta.observacoes || "",
        medicoResponsavelId: dadosConsulta.medicoResponsavelId || 0,
        pacienteId: dadosConsulta.pacienteId || 0,
      },
    });
  }

  async atualizarConsulta(idConsulta: number, dadosParaAtualizar: Omit<Consulta, "id">) {
    const consultaAtualizada = await prisma.consulta.update({
      data: {
        ...dadosParaAtualizar,
      },
      where: {
        id: idConsulta,
      },
    });
    return consultaAtualizada;
  }

  async deletarConsultaId(idConsulta: number) {
    const consulta = await prisma.consulta.delete({
      where: {
        id: idConsulta,
      },
    });
    return consulta;
  }
}

export const consultaRepository = new ConsultaRepository(prisma);