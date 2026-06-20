import type { Request, Response } from "express";
import { PacienteService, pacienteService } from "../services/PacienteService";
import type { Paciente } from "../prisma/generated/prisma/client";

export class PacienteController {
  constructor(private readonly service: PacienteService) {}

  async listarPaciente(req: Request, res: Response) {
      try {
            const pacientes = await this.service.listarPaciente();
            return res.status(200).json(pacientes)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
  }

  async buscarPacienteId(req: Request, res: Response) {
     try {
            const idPaciente = Number(req.params.id)
            const paciente = await this.service.buscarPacienteId(idPaciente)
            return res.status(200).json(paciente)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
  }

  async createPaciente(req: Request, res: Response) {
     try {
                const dadosPaciente = req.body as Paciente
                const pacienteCriado = await this.service.createPaciente(dadosPaciente)
                return res.status(201).json(pacienteCriado)
            } catch (error) {
                console.log(error)
                return res.status(404).json({
                    error
                })
            }
  }

  async atualizarPaciente(req: Request, res: Response) {
    try {
                const idPaciente = Number(req.params.id)
                const dadosParaAtualizar = req.body as Omit<Paciente, 'id'>
                const pacienteAtualizado = await this.service.atualizarPaciente(idPaciente, dadosParaAtualizar)
                return res.status(200).json(pacienteAtualizado);
            } catch (error) {
                console.log(error)
                return res.status(404).json({
                    error
                })
            }
  }

  async deletarPacienteId(req: Request, res: Response) {
    try {
            const idPaciente = Number(req.params.id)
            const paciente = await this.service.deletarPacienteId(idPaciente)
            return res.status(200).json({
                mensagem: "Paciente deletado com sucesso!",
                data: paciente
            });
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
  }
}

export const pacienteController = new PacienteController(pacienteService);
