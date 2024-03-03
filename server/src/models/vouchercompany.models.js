const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    default: "Voucher para canje",
  },
  descripcion: String,
  imagen: String, // Campo para almacenar la URL de la imagen
  stores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
  ],
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recyclingcompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecyclingCompany",
  },
  estado: {
    type: String,
    enum: ["activo", "usado", "vencido"],
    default: "activo",
  },
  ptoscanjevoucher: {
    type: Number,
    required: true,
  },
  duracion: {
    inicio: {
      type: Date,
      required: true,
    },
    fin: {
      type: Date,
      required: true,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  recycledMaterials: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
  ],
});

VoucherSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Voucher", VoucherSchema);
