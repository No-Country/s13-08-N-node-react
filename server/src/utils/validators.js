const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const passwordValidator = [
  {
    validator: function (value) {
      // Validar que la contraseña tenga al menos 7 caracteres, una letra mayúscula y un número
      return /^(?=.*[A-Z])(?=.*\d).{7,}$/.test(value);
    },
    message:
      "La contraseña debe tener al menos 7 caracteres, una letra mayúscula y un número.",
  },
];

const emailValidator = [
  {
    validator: async function (value) {
      const emailExists = await mongoose
        .model("User")
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
  {
    validator: function (value) {
      // Validación de longitud mínima de correo electrónico
      return value.length >= 5;
    },
    message: "El correo electrónico debe tener al menos 5 caracteres",
  },
];

module.exports = {
  passwordValidator,
  emailValidator,
};
