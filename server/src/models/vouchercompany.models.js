const mongoose = require("mongoose");

//muchos a muchos entre model material y punto de reciclaje
const VoucherSchema = new mongoose.Schema({

  titulo: {
    type: String,
    required: true,
    default: "Voucher para canje",
  },
  descripcion: String,

  duracion: {
    inicio: {
      type: String,
      required: true,
    },
    fin: {
      type: String,
      required: true,
    },
  },
  // un voucher puede ser canjeado en múltiples stores y, a su vez, cada store puede aceptar múltiples vouchers,muchos a muchos, tengo que hacer el modelo comercios comrcioscaj ees ategorias
  // Relación muchos a muchos con el modelo de tiendas
  stores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
  ],

  // Relación muchos a uno con el usuario que adquiere el Voucher Esto significa que varios Vouchers pueden estar asociados a un único usuario, pero cada Voucher está directamente vinculado a un solo usuario.
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // Relación muchos a uno con la empresa de reciclaje asociada al Voucher
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  //Relacion muchos a muchos Cada voucher tiene múltiples tipos de materiales, y cada tipo de material puede tener multiples voucher.
  recycledMaterials: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
  ],
});

// Middleware para actualizar automáticamente el campo 'updatedAt'
VoucherSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Define el modelo a partir del esquema
module.exports = mongoose.model("Voucher", VoucherSchema);


