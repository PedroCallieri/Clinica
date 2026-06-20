import type { Paciente, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class PacienteRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listarPaciente() {
    const paciente = await prisma.paciente.findMany();
    return paciente;
  }

  async buscarPacienteId(idPaciente: number) {
    const paciente = await prisma.paciente.findUnique({
      where: {
        id: idPaciente,
      },
    });
    return paciente;
  }

  async createPaciente(dadosPaciente: Partial<Paciente>) {
    return await this.prisma.paciente.create({
      data: {
        nome: dadosPaciente.nome || "",
        cpf: dadosPaciente.cpf || "",
        telefone: dadosPaciente.telefone || "",
        email: dadosPaciente.email || "",
        dataNascimento: dadosPaciente.dataNascimento || "",
        sexo: dadosPaciente.sexo || "",
        responsavel: dadosPaciente.responsavel || ""
      },
    });
  }

  async atualizarPaciente(idPaciente: number, dadosParaAtualizar: Omit<Paciente, "id">) {
    const pacienteAtualizado = await prisma.paciente.update({
      data: {
        ...dadosParaAtualizar,
      },
      where: {
        id: idPaciente,
      },
    });
    return pacienteAtualizado;
  }

  async deletarPacienteId(idPaciente: number) {
    const paciente = await prisma.paciente.delete({
      where: {
        id: idPaciente,
      },
    });
    return paciente;
  }
}

export const pacienteRepository = new PacienteRepository(prisma);
