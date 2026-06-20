import { Router } from "express";
import { consultaController } from "../controllers/ConsultaController";

export const consultaRouter = Router();

consultaRouter.get('/consultas', async (_, res) => {
  return consultaController.listarConsulta(_, res);
});

consultaRouter.get('/consultas/:id', async (req, res) => {
  return consultaController.buscarConsultaId(req, res);
});

consultaRouter.post('/consultas', async (req, res) => {
  return consultaController.createConsulta(req, res);
});

consultaRouter.put('/consultas/:id', async (req, res) => {
  return consultaController.atualizarConsulta(req, res);
});

consultaRouter.delete('/consultas/:id', async (req, res) => {
  return consultaController.deletarConsultaId(req, res);
});