const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define el esquema de Mongoose
const materialSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripción: {
    type: String,
    required: true,
  },
  codigoQR: {
    type: String,
    required: true,
  },
  valor: {
    type: String,
    required: true,
    unique: true,
  },
  categoria: String,
  imagen: [{}],
});

// Define el modelo a partir del esquema
const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
