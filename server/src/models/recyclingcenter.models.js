const mongoose = require("mongoose");
const recyclingCenterMaterialSchema = require("../models/relations/recyclingCenterMaterial.js");
//muchos a muchos entre model material y punto de reciclaje
const recyclingcenterSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  ubicacion: String,
  horario_atencion: String,
  tipoMaterialAcepta: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecyclingCenterMaterial",
    },
  ],
  imagen: {
    type: String,
  },
  latLng: {
      type: {
          lat: {
              type: String,
              required: true
          },
          lng: {
              type: String,
              required: true
          }
      },
      required: true
  },
});

const RecyclingCenter = mongoose.model("RecyclingCenter", recyclingcenterSchema);

module.exports = RecyclingCenter;
