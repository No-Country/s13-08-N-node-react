const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcionTicket: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Abierto", "En Progreso", "Cerrado"],
    default: "Abierto",
  },
  asignadoA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  materialesRelacionados: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
    },
  ],
  CompanyRelacionada: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecyclingCompany",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //que usuarios han usado este ticket
  usuarioUtilizado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
