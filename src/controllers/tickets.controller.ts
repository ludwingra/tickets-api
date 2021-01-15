import { RequestHandler } from "express";
import { resolve } from "path";

// Models
import Ticket from "../models/Ticket";
import Agent from "../models/Agent";

// Obtener lista de tickets
export const getTickets: RequestHandler = async (req, res, next) => {
  try {
    // Obtiene lista de tickers
    const tickets = await Ticket.find().sort({ "createdAt": 1 });
    return res.json(tickets);
  } catch (error) {
    res.json(error);
  }
}
// Obtener un ticket por id
export const getTicket: RequestHandler = async (req, res, next) => {
  try {
    // Obtiene ticket por id
    const findTicket = await Ticket.findOne({ _id: req.params.id });
    return res.json(findTicket);
  } catch (error) {
    res.json(error);
  }
}
// Agregar un ticket
export const createTicket: RequestHandler = async (req, res, next) => {
  try {
    // Crear el ticket
    const ticket = new Ticket(req.body);
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);

    validateAgentTicket();

    return;
  } catch (error) {
    res.json(error);
  }
}

// Elimina un ticker
export const deleteTicket: RequestHandler = async (req, res, next) => {
  try {
    const findTicket = await Ticket.findOne({ _id: req.params.id });
    if (!findTicket) return res.status(204).json('Ticket no encontrado');
    return res.json(findTicket);
  } catch (error) {
    res.json(error);
  }
}

// Conecta un agente
export const agentConnect: RequestHandler = async (req, res) => {
  try {

    let agentConnect = await Agent.findByIdAndUpdate(req.body.agent, { connected: true });
    let rpt: any = { connect: agentConnect };

    let assignmentTicket = await assignment(req.body);
    rpt.assignment = assignmentTicket;
    res.json(rpt);
  } catch (error) {
    res.json(error);
  }
}

// Determina que un caso est resuelto
export const solvedTicket: RequestHandler = async (req, res) => {
  try {
    let solved = await updateTicket(req.params.id, { status: true });
    res.json({
      message: 'Ticket resuelto'
    });

    validateAgentTicket();

  } catch (error) {

  }
}

// -- Metodos para interactuar con los tickets

const updateTicket = (id: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ticketUpdate = await Ticket.findByIdAndUpdate(id, data);
      resolve('');
    } catch (error) {
      reject(error);
    }
  })
}

const validateAgentTicket = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Obtiene los agentes conectados
      const agents = await Agent.find({ connected: true }).sort({ "createdAt": 1 });

      // Valida que los agentes esten conectados
      if (agents && agents.length) {
        let agentId;
        for (let i of agents) {
          // Valida que el Agente este libre
          let ticketAgent = await Ticket.find({
            agent: i._id,
            status: false
          });

          if (!ticketAgent.length) {
            agentId = i._id;
            break;
          }
        }
        // Asigna el ticket a un agente conectado
        let assig = assignment({ agent: agentId });
        resolve(assig);
      }
    } catch (error) {
      reject(error);
    }
  })
}

const assignment = async (body: any) => {
  return new Promise(async (resolve, reject) => {
    try {

      const tickets = await Ticket.find({
        $and: [
          { status: false },
          { agent: null }
        ]
      }).sort({ "createdAt": 1 });

      if (!tickets.length) {
        resolve({
          message: 'No se encuentrar tickets pendientes'
        });
      }

      let id = tickets[0]._id;

      await updateTicket(id, { agent: body.agent });

      const data = await Ticket.find({ _id: id });

      resolve({
        message: 'Ticket asignado',
        data
      });
    } catch (error) {
      reject(error);
    }
  })
}
