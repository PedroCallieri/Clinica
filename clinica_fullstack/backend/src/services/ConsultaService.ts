import type { Consulta } from "../prisma/generated/prisma/client";
import {
  ConsultaRepository,
  consultaRepository,
} from "../repositories/ConsultaRepository";
import { pacienteRepository } from "../repositories/PacientRepository";
import { userRepository } from "../repositories/UserRepository";

export class ConsultaService {
  constructor(private readonly repository: ConsultaRepository) {}

  async listarConsulta() {
    const consultas = await this.repository.listarConsulta();
    return consultas;
  }

  async buscarConsultaId(idConsulta: number) {
    const consulta = await this.repository.buscarConsultaId(idConsulta);
    return consulta;
  }

  async createConsulta(dadosConsulta: Partial<Consulta>) {
    if (!dadosConsulta.pacienteId) {
      throw new Error("pacienteId é obrigatório");
    }
    if (!dadosConsulta.medicoResponsavelId) {
      throw new Error("medicoResponsavelId é obrigatório");
    }

    const paciente = await pacienteRepository.buscarPacienteId(dadosConsulta.pacienteId);
    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }

    const usuario = await userRepository.buscarUsuarioId(dadosConsulta.medicoResponsavelId);
    if (!usuario) {
      throw new Error("Usuário (médico responsável) não encontrado");
    }

    const consultaCriada = await this.repository.createConsulta(dadosConsulta);
    return consultaCriada;
  }

  async atualizarConsulta(idConsulta: number, dadosParaAtualizar: Omit<Consulta, "id">) {
    const consultaAtualizada = await this.repository.atualizarConsulta(idConsulta, dadosParaAtualizar);
    return consultaAtualizada;
  }

  async deletarConsultaId(idConsulta: number) {
    const consulta = await this.repository.deletarConsultaId(idConsulta);
    return consulta;
  }
}

export const consultaService = new ConsultaService(consultaRepository);