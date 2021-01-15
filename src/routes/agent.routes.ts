import { Router } from "express";

//Importar controller
import * as agentController from "../controllers/agent.controller";

const router = Router();

// Obtner ticket por id
router.get('/agent/:id', agentController.getAgent);
// Obtner lista de tickets
router.get('/agent', agentController.getAgents);
// Crear un ticket
router.post('/agent', agentController.createAgent);
// Eliminar un ticket por id
router.delete('/agent', agentController.deleteAgent);

// Se desconecta un agente
router.get('/agent/disconnect/:agent', agentController.agentDisconnected);



export default router;