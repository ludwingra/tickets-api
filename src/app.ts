import express from 'express';
import morgan from "morgan";
import cors from "cors";
import config from "./config";

// Importar routes
import TicketRoutes from "./routes/ticket.routes";
import AgentRoutes from "./routes/agent.routes";

import Agent from "./models/Agent";

const app = express();

app.set('port', config.PORT);

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(TicketRoutes);
app.use(AgentRoutes);

// Valida los agentes
(async () => {
  // Busca los agentes
  const agent = await Agent.find();
  if (!agent.length) {
    // Si no encuentra agentes, crea 5 de prueba
    let data: any = [
      { name: 'Luis' },
      { name: 'Carlos' },
      { name: 'Camila' },
      { name: 'Diana' },
      { name: 'Luisa' },
    ];
    Agent.insertMany(data)
      .then((res) => {
        console.log(res);
      })
      .catch(error => console.error(error));

  }
})();

export default app;