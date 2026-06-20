import type { Request, Response } from "express";
import { ConsultaService, consultaService } from "../services/ConsultaService";
import type { Consulta } from "../prisma/generated/prisma/client";

export class ConsultaController {
  constructor(private readonly service: ConsultaService) {}

  async listarConsulta(req: Request, res: Response) {
    try {
      const consultas = await this.service.listarConsulta();
      return res.status(200).json(consultas);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async buscarConsultaId(req: Request, res: Response) {
    try {
      const idConsulta = Number(req.params.id);
      const consulta = await this.service.buscarConsultaId(idConsulta);
      return res.status(200).json(consulta);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async createConsulta(req: Request, res: Response) {
    try {
      const dadosConsulta = req.body as Consulta;
      const consultaCriada = await this.service.createConsulta(dadosConsulta);
      return res.status(201).json(consultaCriada);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error });
    }
  }

  async atualizarConsulta(req: Request, res: Response) {
    try {
      const idConsulta = Number(req.params.id);
      const dadosParaAtualizar = req.body as Omit<Consulta, "id">;
      const consultaAtualizada = await this.service.atualizarConsulta(idConsulta, dadosParaAtualizar);
      return res.status(200).json(consultaAtualizada);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async deletarConsultaId(req: Request, res: Response) {
    try {
      const idConsulta = Number(req.params.id);
      const consulta = await this.service.deletarConsultaId(idConsulta);
      return res.status(200).json({
        mensagem: "Consulta deletada com sucesso!",
        data: consulta,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}

export const consultaController = new ConsultaController(consultaService);