import { RequestHandler } from "express";
import { resolve } from "path";

// Models
import Ticket from "../models/Ticket";
import Agent from "../models/Agent";

// Obtener lista de tickets
export const getTickets: RequestHandler = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().sort({ "createdAt": 1 });
    return res.json(tickets);
  } catch (error) {
    res.json(error);
  }
}
// Obtener un ticket por id
export const getTicket: RequestHandler = async (req, res, next) => {
  try {
    const findTicket = await Ticket.findOne({ _id: req.params.id });
    return res.json(findTicket);
  } catch (error) {
    res.json(error);
  }
}

export const createTicket: RequestHandler = async (req, res, next) => {
  try {
    const ticket = new Ticket(req.body);
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);

    let agents = Agent.find({
      connected: true
    }).sort({ "createdAt": 1 });

    if (agents.length) {
      assignment({ agent: agents[0]._id });
    }

    return;
  } catch (error) {
    res.json(error);
  }
}

export const deleteTicket: RequestHandler = async (req, res, next) => {
  try {
    const findTicket = await Ticket.findOne({ _id: req.params.id });
    if (!findTicket) return res.status(204).json('Ticket no encontrado');
    return res.json(findTicket);
  } catch (error) {
    res.json(error);
  }
}

export const agentConnect: RequestHandler = async (req, res) => {
  try {

    await Agent.findByIdAndUpdate(req.body.agent, { connected: true });

    let assignmentTicket = await assignment(req.body);
    res.json(assignmentTicket);
  } catch (error) {
    res.json(error);
  }
}

// -- Metodos para interactuar con los tickets

const updateTicket = (id: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ticketUpdate = await Ticket.findByIdAndUpdate(id, data);
      resolve('');
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