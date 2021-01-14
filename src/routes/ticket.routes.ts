import { Router } from "express";

//Importar controller
import * as ticketController from "../controllers/tickets.controller";

const router = Router();

// Obtner ticket por id
router.get('/tickets/:id', ticketController.getTicket);
// Obtner lista de tickets
router.get('/tickets', ticketController.getTickets);
// Crear un ticket
router.post('/tickets', ticketController.createTicket);
// Eliminar un ticket por id
router.delete('/tickets', ticketController.deleteTicket);

// Se conecta un agente
router.post('/agent/connect', ticketController.agentConnect);

// router.put('/tickets', ticketController.updateTicket);

export default router;