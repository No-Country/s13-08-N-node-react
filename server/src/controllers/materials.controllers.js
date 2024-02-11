const GenerateQRcode = require("../utils/qrgenerator.js");
const { decodeToken } = require("../helpers/generateToken.js");
const Material = require("../models/material.models.js");
module.exports = {
  QRGenerator: async (req, res) => {
    try {
      // Verificar si el token está presente en los headers de la solicitud
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
      }

      // Decodificar el token para obtener la información del usuario
      const decodedToken = await decodeToken(token);
      console.log(decodedToken);
      if (!decodedToken || !decodedToken._id) {
        return res.status(401).json({ error: "Token inválido" });
      }

      const userId = decodedToken._id;

      // Generar el código QR
      const codigoQR = await GenerateQRcode(userId);

      // Guardar el código QR en la base de datos asociado al usuario
      const material = new Material({
        nombre: userId.nombre,
        descripción: userId.descripción,
        codigoQR: userId.codigoQR,
        valor: userId.valor,
        categoria: userId.categoria,
        imagen: [userId.imagen],
      });
      await material.save();

      res.status(201).json({ codigoQR });
    } catch (error) {
      console.error("Error al generar el código QR:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
