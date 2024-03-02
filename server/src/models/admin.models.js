const mongoose = require("mongoose");
const BaseUser = require("./base.models.js");

// Define el esquema para el administrador, que hereda del esquema base
const AdminSchema = new mongoose.Schema({
  isAdmin: { type: Boolean, default: true }, // Agregar isAdmin para el modelo de administrador
});

// Crea el modelo de administrador utilizando el modelo base
module.exports = BaseUser.discriminator("Admin", AdminSchema);
