const mongoose = require("mongoose");
const BaseUser = require("./base.models.js");

// Define el esquema para el usuario, que hereda del esquema base
const UserSchema = new mongoose.Schema({
  // Agrega aquí los campos específicos del usuario
  ubicacion: String,
  historial_reciclaje: String,
  puntosAcumulados: Number,
  vouchers: String,
  beneficiosObtenidos: String,
});

// Crea el modelo de usuario utilizando el modelo base
module.exports = BaseUser.discriminator("User", UserSchema);
