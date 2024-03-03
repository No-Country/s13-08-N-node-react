const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  nombrematerial: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  pesoMaterial: {
    type: Number,
    required: true,
  },
  recyclingCenters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
    },
  ],
  imagen: {
    type: String,
  },
});

// Método para calcular los puntos a partir del peso
materialSchema.methods.calcularPuntos = function () {
  // Definir la tasa de conversión de peso a puntos (200 puntos por kilo)
  const tasaConversion = 200;
  // Calcular los puntos basados en el peso del material
  const puntos = this.pesoMaterial * tasaConversion;
  return puntos;
};

module.exports = mongoose.model("Material", materialSchema);



