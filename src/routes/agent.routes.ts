import { Router } from "express";

//Importar controller
import * as agentController from "../controllers/agent.controller";

const router = Router();

// Obtner agent por id
router.get('/agent/:id', agentController.getAgent);
// Obtner lista de agent
router.get('/agent', agentController.getAgents);
// Crear un agent
router.post('/agent', agentController.createAgent);
// Eliminar un agent por id
router.delete('/agent', agentController.deleteAgent);

// Se desconecta un agente
router.get('/agent/disconnect/:agent', agentController.agentDisconnected);



export default router;