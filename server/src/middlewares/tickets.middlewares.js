const { verifyToken } = require("../helpers/generateToken.js");
const recyclingCompanySchema = require("../models/recyclingcompany.models.js");
module.exports = {
  TicketMiddleware: async (req, res, next) => {
    try {
      // Verificar si la ruta es para actualizar o eliminar un Ticket
      const isTicketUpdateOrDeleteRoute =
        req.path.match(/^\/tickets\/[^/]+$/) &&
        (req.method === "PUT" || req.method === "DELETE");
      if (isTicketUpdateOrDeleteRoute) {
        const token = req.headers.authorization?.split(" ").pop();
        if (!token) {
          return res.status(401).send({ error: "Debes estar logueado" });
        }

        // Verificar el token
        const tokenData = await verifyToken(token);
        // Comparar si la id del token es igual a la id del voucher
        const Ticket = await TicketSchema.findById(tokenData._id);
        if (!Ticket) {
          return res.status(401).send({ error: "Ticket no encontrado" });
        }
        req.Ticket = Ticket;
      }
      // Continuar con la siguiente middleware
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: "Error interno del servidor" });
    }
  },
};
