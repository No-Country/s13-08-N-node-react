const { calcularPuntosPorTicket } = require("../utils/calcptosporticket.js");
const ticketSchema = require("../models/tickets.models.js");
module.exports = {
  obtenerPuntosDeTicket: async (req, res) => {
    const { ticketId } = req.params;

    try {
      // Obtener el ticket de la base de datos
      const ticket = await ticketSchema
        .findById(ticketId)
        .populate("materialesRelacionados"); //es el nombre del campo que esta en tickets models

      if (!ticket) {
        return res.status(404).json({ error: "Ticket no encontrado" });
      }

      // Calcular los puntos del ticket usando la función en utils
      const puntosDelTicket = calcularPuntosPorTicket(ticket);

      if (puntosDelTicket === null) {
        return res
          .status(500)
          .json({ error: "Error al calcular los puntos del ticket" });
      }

      // Devolver los puntos del ticket en la respuesta
      res.json({ puntos: puntosDelTicket });
    } catch (error) {
      console.error("Error al obtener puntos de ticket:", error.message);
      res.status(500).json({ error: "Error de servidor" });
    }
  },
};
