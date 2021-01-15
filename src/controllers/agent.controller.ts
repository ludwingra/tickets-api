import { RequestHandler } from "express";

// Models
import Ticket from "../models/Ticket";
import Agent from "../models/Agent";

// Obtener lista de agebtes
export const getAgents: RequestHandler = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.connected) {
      query = { connected: req.query.connected }
    }
    // Obtiene lista de tickers
    const agents = await Agent.find(query).sort({ "createdAt": 1 });

    return res.json(agents);
  } catch (error) {
    res.json(error);
  }
}
// Obtener un agent por id
export const getAgent: RequestHandler = async (req, res, next) => {
  try {
    // Obtiene ticket por id
    const findAgent = await Agent.findOne({ _id: req.params.id });
    return res.json(findAgent);
  } catch (error) {
    res.json(error);
  }
}
// Agregar un agent
export const createAgent: RequestHandler = async (req, res, next) => {
  try {
    // Crear el ticket
    const agent = new Agent(req.body);
    const savedAgent = await agent.save();
    res.status(201).json(savedAgent);
    return;
  } catch (error) {
    res.json(error);
  }
}

// Elimina un agent
export const deleteAgent: RequestHandler = async (req, res, next) => {
  try {
    const findAgent = await Agent.findOne({ _id: req.params.id });
    if (!findAgent) return res.status(204).json('Agente no encontrado');
    return res.json(findAgent);
  } catch (error) {
    res.json(error);
  }
}

// Desconecta un agente
export const agentDisconnected: RequestHandler = async (req, res) => {
  try {

    await Agent.findByIdAndUpdate(req.body.agent, { connected: false });
    res.json({
      message: 'Agente desconectado'
    });
  } catch (error) {
    res.json(error);
  }
}
