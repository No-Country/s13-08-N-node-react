const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { passwordValidator, emailValidator } = require("../utils/validators.js");

// Define el esquema base de Mongoose con los campos comunes
const baseUserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    validate: passwordValidator,
  },
  roles: [
    {
      ref: "Role",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

baseUserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    // Hashea la contraseña solo si es nueva o ha sido modificada
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  this.updatedAt = new Date(); // Actualiza la fecha de actualización
  next();
});

// Middleware para actualizar automáticamente el campo 'updatedAt'
baseUserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Define el modelo base a partir del esquema
module.exports = mongoose.model("BaseUser", baseUserSchema);
