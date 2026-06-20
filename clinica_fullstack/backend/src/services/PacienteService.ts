import type { Paciente } from "../prisma/generated/prisma/client";
import {
  PacienteRepository,
  pacienteRepository,
} from "../repositories/PacientRepository";

export class PacienteService {
  constructor(private readonly repository: PacienteRepository) {}

  async listarPaciente() {
    const pacientes = await this.repository.listarPaciente();
    return pacientes;
  }

  async buscarPacienteId(idPaciente: number) {
    const paciente = await this.repository.buscarPacienteId(idPaciente);
    return paciente;
  }

async createPaciente(dadosPaciente: Partial<Paciente>) {
  const pacienteCriado = await this.repository.createPaciente({
    ...dadosPaciente,
    responsavel: dadosPaciente.responsavel ?? null,
  });
  return pacienteCriado;
}

  async atualizarPaciente(idPaciente: number, dadosParaAtualizar: Omit<Paciente, "id">) {
    const pacienteAtualizado = await this.repository.atualizarPaciente(idPaciente, dadosParaAtualizar)
    return pacienteAtualizado;
  }

  async deletarPacienteId(idPaciente: number) {
    const paciente = await this.repository.deletarPacienteId(idPaciente);
    return paciente;
  }
}

export const pacienteService = new PacienteService(pacienteRepository);
