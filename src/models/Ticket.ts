import { Schema, model } from "mongoose";

const TicketSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    default: false
  },
  agent: {
    type: String,
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
});

export default model('Ticket', TicketSchema);
