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

module.exports = mongoose.model("Material", materialSchema);


