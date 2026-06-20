import type { Request, Response } from "express";
import { ProntuarioService, prontuarioService } from "../services/ProntuarioService";
import type { Prontuario } from "../prisma/generated/prisma/client";

export class ProntuarioController {
  constructor(private readonly service: ProntuarioService) {}

  async listarProntuario(req: Request, res: Response) {
    try {
      const prontuarios = await this.service.listarProntuario();
      return res.status(200).json(prontuarios);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async buscarProntuarioId(req: Request, res: Response) {
    try {
      const idProntuario = Number(req.params.id);
      const prontuario = await this.service.buscarProntuarioId(idProntuario);
      return res.status(200).json(prontuario);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async createProntuario(req: Request, res: Response) {
    try {
      const dadosProntuario = req.body as Prontuario;
      const prontuarioCriado = await this.service.createProntuario(dadosProntuario);
      return res.status(201).json(prontuarioCriado);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error });
    }
  }

  async atualizarProntuario(req: Request, res: Response) {
    try {
      const idProntuario = Number(req.params.id);
      const dadosParaAtualizar = req.body as Omit<Prontuario, "id">;
      const prontuarioAtualizado = await this.service.atualizarProntuario(idProntuario, dadosParaAtualizar);
      return res.status(200).json(prontuarioAtualizado);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async deletarProntuarioId(req: Request, res: Response) {
    try {
      const idProntuario = Number(req.params.id);
      const prontuario = await this.service.deletarProntuarioId(idProntuario);
      return res.status(200).json({
        mensagem: "Prontuário deletado com sucesso!",
        data: prontuario,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}

export const prontuarioController = new ProntuarioController(prontuarioService);