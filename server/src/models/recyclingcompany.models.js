const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  passwordValidator,
  emailValidator,
  direccionValidator,
} = require("../validators/validators.js");
//muchos a muchos entre model material y punto de reciclaje
const recyclingCompanySchema = new mongoose.Schema({
  nombreempresa: {
    type: String,
    required: true,
  },
  rubro: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
    validate: direccionValidator,
  },
  emailempresa: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    validate: passwordValidator,
  },
  horario_atencion: String,

  vouchers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Voucher" }], // Relación muchos a muchos Cada empresa puede emitir múltiples vales, y cada vale puede ser emitido por múltiples empresas.

  //Relacion muchos a muchos Cada empresa puede reciclar múltiples tipos de materiales, y cada tipo de material puede ser reciclado por múltiples empresas.
  recycledMaterials: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
  ],

  // Relación uno a muchos con los puntos de reciclaje
  recyclingPoints: [
    { type: mongoose.Schema.Types.ObjectId, ref: "RecyclingPoints" },
  ],
});

// Middleware para actualizar automáticamente el campo 'updatedAt'
recyclingCompanySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Middleware para hashear la contraseña
recyclingCompanySchema.pre("save", function (next) {
  // Verifica si hay una nueva contraseña o si se ha modificado la contraseña
  if (this.isNew || this.isModified("password")) {
    // Verifica que la contraseña esté presente en el documento
    if (this.password) {
      const saltRounds = 10;
      this.password = bcrypt.hashSync(this.password, saltRounds);
    }
  }
  next();
});

// Define el modelo a partir del esquema
module.exports = mongoose.model("RecyclingCompany", recyclingCompanySchema);
