import type { Prontuario } from "../prisma/generated/prisma/client";
import {
  ProntuarioRepository,
  prontuarioRepository,
} from "../repositories/ProntuarioRepository";
import { pacienteRepository } from "../repositories/PacientRepository";
import { userRepository } from "../repositories/UserRepository";

export class ProntuarioService {
  constructor(private readonly repository: ProntuarioRepository) {}

  async listarProntuario() {
    const prontuarios = await this.repository.listarProntuario();
    return prontuarios;
  }

  async buscarProntuarioId(idProntuario: number) {
    const prontuario = await this.repository.buscarProntuarioId(idProntuario);
    return prontuario;
  }

  async createProntuario(dadosProntuario: Partial<Prontuario>) {
    if (!dadosProntuario.pacienteId) {
      throw new Error("pacienteId é obrigatório");
    }
    if (!dadosProntuario.medicoResponsavelId) {
      throw new Error("medicoResponsavelId é obrigatório");
    }

    const paciente = await pacienteRepository.buscarPacienteId(dadosProntuario.pacienteId);
    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }

    const usuario = await userRepository.buscarUsuarioId(dadosProntuario.medicoResponsavelId);
    if (!usuario) {
      throw new Error("Usuário (médico responsável) não encontrado");
    }

    const prontuarioCriado = await this.repository.createProntuario({
      ...dadosProntuario,
      data: dadosProntuario.data ?? null,
    });
    return prontuarioCriado;
  }

  async atualizarProntuario(idProntuario: number, dadosParaAtualizar: Omit<Prontuario, "id">) {
    const prontuarioAtualizado = await this.repository.atualizarProntuario(idProntuario, dadosParaAtualizar);
    return prontuarioAtualizado;
  }

  async deletarProntuarioId(idProntuario: number) {
    const prontuario = await this.repository.deletarProntuarioId(idProntuario);
    return prontuario;
  }
}

export const prontuarioService = new ProntuarioService(prontuarioRepository);