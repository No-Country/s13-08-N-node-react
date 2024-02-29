const mongoose = require("mongoose");
const StoreSchema = require("../models/stores.models.js");
const {
  Types: { ObjectId },
} = require("mongoose");

const bcrypt = require("bcrypt");
const {
  verifyCompanyToken,
  tokenSign,
  decodeCompanyToken,
} = require("../helpers/generateToken.js");

module.exports = {
  CreateStore: async (req, res) => {
    try {
      const { nombrestore } = req.body;
      const authHeader = req.headers.authorization;

      // Verificar si hay un token de autorización en el encabezado
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
      }

      const token = authHeader.split(" ")[1]; // Obtener el token del encabezado

      const decodedToken = await verifyCompanyToken(token); // Decodificar el token para obtener la información de la empresa
      console.log(decodedToken);
      const empresaId = decodedToken._id; // Obtener la ID de la empresa del token

      // Verificar si la empresa existe
      if (!empresaId) {
        return res.status(401).json({
          error: "No se pudo encontrar la ID de la empresa en el token",
        });
      }

      // Verificar si el voucher ya está creado para esta empresa
      const existingStore = await StoreSchema.findOne({
        recyclingcompany: empresaId,
      });
      if (existingStore) {
        return res
          .status(400)
          .json({ error: "El comercio ya está creado para esta empresa" });
      }

      // Crear el nuevo voucher con los datos proporcionados
      const newStore = new StoreSchema({
        nombrestore,
      });

      // Guardar el nuevo voucher en la base de datos
      await newStore.save();

      // Respuesta exitosa
      return res.status(201).json({ message: "comercio creado exitosamente" });
    } catch (error) {
      console.error("Error al crear comercio:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  GetAllStores: (req, res) => {
    StoreSchema.find({}, "nombrestore,puntos") // ver en front cuales son los capos de stores a mostrar
      .then((data) => {
        if (!data || data.length === 0) {
          res.status(204).json({ message: "Stores not found" });
        } else {
          res.status(200).json(data);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
      });
  },

  FindStore: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await StoreSchema.findOne({ _id: id });
      if (data) {
        res.json(data);
      } else {
        res.json({ message: "Store not found" });
      }
    } catch (error) {
      res.json({ message: error });
    }
  },

  UpdateStore: async (req, res) => {
    try {
      const storeId = req.params.id;

      // Verificar si el store existe
      const existingStore = await StoreSchema.findById(storeId);
      if (!existingStore) {
        return res.status(404).json({ message: "Store not found" });
      }

      // Actualizar los campos de la tienda
      existingStore.puntos = req.body.puntos; // Actualizar los puntos según los datos proporcionados en el cuerpo de la solicitud

      // Guardar la tienda actualizada en la base de datos
      await existingStore.save();

      // Respuesta exitosa
      return res.status(200).json({ message: "Store updated successfully" });
    } catch (error) {
      console.error("Error updating store:", error);
      return res.status(500).json({ error: "Error updating store" });
    }
  },

  DeleteStore: async (req, res) => {
    const { id } = req.params;

    try {
      const Store = await StoreSchema.findOneAndDelete({ _id: id });
      //console.log(user);
      if (Store) {
        res.status(200).json({
          status: "Store borrado",
        });
      } else {
        res.status(400).json({
          status: "Store no encontrado",
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
