const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define el esquema de Mongoose
const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "El correo electrónico debe tener al menos 5 caracteres"],
    validate: [
      {
        validator: async function (value) {
          const emailExists = await mongoose
            .model("user")
            .findOne({ email: value });
          return !emailExists;
        },
        message: "Este correo electrónico ya está registrado",
      },
      {
        validator: function (value) {
          // Validación de formato de correo electrónico
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: "Formato de correo electrónico no válido",
      },
    ],
  },
  password: String,
  roles: [
    {
      ref: "Role",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  ubicación: String,
  historial_reciclaje: String,
  puntos: Number,
  beneficios: [String],
});

// Antes de guardar, hashear la contraseña si se ha modificado
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

// Define el modelo a partir del esquema
const User = mongoose.model("User", userSchema);

module.exports = User;
