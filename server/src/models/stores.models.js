const mongoose = require("mongoose");

//muchos a muchos entre model material y punto de reciclaje
const StoreSchema = new mongoose.Schema({
  nombrestore: {
    type: String,
    required: true,
  },

  // Relacion uno a muchos, una empresa puede tener muchas stores asociadas
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: "RecyclingCompany" },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para actualizar automáticamente el campo 'updatedAt'
StoreSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Define el modelo a partir del esquema
module.exports = mongoose.model("Store", StoreSchema);
