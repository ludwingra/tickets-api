import { Schema, model } from "mongoose";

const AgentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  connected: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  timestamps: true
});

export default model('Agent', AgentSchema);
