const mongoose = require("mongoose");
const Material = require('../models/material.models')

const recyclingcenterSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  ubicacion: String,
  horario_atencion: String,
  materials: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material"
    },
    nombre: String
  }],
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

