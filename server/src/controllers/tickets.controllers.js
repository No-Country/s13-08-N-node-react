const mongoose = require("mongoose");
const TicketSchema = require("../models/tickets.models.js");
const StoreSchema = require("../models/stores.models.js");
const {
  Types: { ObjectId },
} = require("mongoose");
const { verifyCompanyToken } = require("../helpers/generateToken.js");
const { calcularPuntosPorTicket } = require("../utils/calcptosporticket.js");

module.exports = {
  CreateTicket: async (req, res) => {
    try {
      const { titulo, descripcionTicket, materialesRelacionados } = req.body;
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
      }

      const token = authHeader.split(" ")[1];

      // verifiacr token empresa
      const decodedToken = await verifyCompanyToken(token);
      const companyId = decodedToken._id;

      if (!companyId) {
        return res.status(401).json({
          error: "No se pudo encontrar la ID de la empresa en el token",
        });
      }

      // Calcula los puntos del ticket utilizando la función calcularPuntosPorTicket
      const pesoTotal = materialesRelacionados.reduce((total, material) => {
        return total + material.peso;
      }, 0);

      // aaca se convierte el peso en puntos
      const puntos = calcularPuntosPorTicket(pesoTotal);

      // Crea el nuevo ticket
      const newTicket = new TicketSchema({
        titulo,
        descripcionTicket,
        materialesRelacionados,
        CompanyRelacionada: companyId,
        puntos, // Asigna los puntos calculados al ticket
      });

      await newTicket.save();

      return res.status(201).json({ message: "Ticket creado exitosamente" });
    } catch (error) {
      console.error("Error al crear el ticket:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  GetAllTickets: (req, res) => {
    TicketSchema.find({}, "empresa_reciclaje,duracion") // ver en front cuales son los capos de voucher a mostrar
      .then((data) => {
        if (!data || data.length === 0) {
          res.status(204).json({ message: "Ticket not found" });
        } else {
          res.status(200).json(data);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
      });
  },

  FindTicket: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await TicketSchema.findOne({ _id: id });
      if (data) {
        res.json(data);
      } else {
        res.json({ message: "Ticket not found" });
      }
    } catch (error) {
      res.json({ message: error });
    }
  },

  UpdateTicket: async (req, res) => {
    try {
      const ticketId = req.params.id;
      const newStatus = req.body.status;

      // Verificar si el ticket existe
      const existingTicket = await TicketSchema.findById(ticketId);
      if (!existingTicket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      // Verificar si el nuevo estado es uno de los estados permitidos
      if (!["Abierto", "En Progreso", "Cerrado"].includes(newStatus)) {
        return res.status(400).json({ error: "Estado no válido" });
      }

      // Actualizar el estado del ticket
      existingTicket.status = newStatus;

      // Guardar el ticket actualizado en la base de datos
      await existingTicket.save();

      // Respuesta exitosa
      return res.status(200).json({ message: "Ticket updated successfully" });
    } catch (error) {
      console.error("Error updating Ticket:", error);
      return res.status(500).json({ error: "Error updating Ticket" });
    }
  },

  DeleteTicket: async (req, res) => {
    const { id } = req.params;

    try {
      const Ticket = await TicketSchema.findOneAndDelete({ _id: id });
      //console.log(user);
      if (Ticket) {
        res.status(200).json({
          status: "Ticket borrado",
        });
      } else {
        res.status(400).json({
          status: "Ticket no encontrado",
        });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({
        status: "no autorizado",
        message: error.message,
      });
    }
  },
};
