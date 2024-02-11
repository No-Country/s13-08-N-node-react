const UserSchema = require("../models/user.models.js");
const { emailValidator, passwordValidator } = require("../utils/validators.js");
const { tokenSign, verifyToken } = require("../helpers/generateToken.js");
const bcrypt = require("bcrypt");

module.exports = {
  RegisterUser: async (req, res) => {
    try {
      const {
        nombre,
        email,
        apellido,
        password,
        roles,
        ubicación,
        historial_reciclaje,
        puntos,
        beneficios,
      } = req.body;

      // Validar el correo electrónico
      const isEmailValid = emailValidator.some((validator) =>
        validator.validator(email)
      );
      if (!isEmailValid) {
        return res.status(400).json({ error: "Correo electrónico no válido" });
      }

      // Validar la contraseña
      const isPasswordValid = passwordValidator.every((validator) =>
        validator.validator(password)
      );
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Contraseña no válida" });
      }

      // Verificar si el correo electrónico ya está registrado
      const existingUser = await userSchema.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "El correo electrónico ya está registrado" });
      }

      // Crear un nuevo usuario
      const newUser = new userSchema({
        nombre,
        apellido,
        email,
        password,
        roles,
        ubicación,
        historial_reciclaje,
        puntos,
        beneficios,
      });

      // Guardar el nuevo usuario en la base de datos
      const savedUser = await newUser.save();

      return res.status(201).json({
        message: "Usuario registrado exitosamente",
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  LoginUA: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await UserSchema.findOne({ email });

      // Check if the user exists
      if (user) {
        // Check if the user is an admin
        if (user.roles.includes("admin")) {
          // For admin login
          // Compare hashed passwords using bcrypt
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) {
            // Passwords match, generate a token
            const tokenSession = await tokenSign({
              id: user._id,
              role: user.roles,
            });

            // Return the user and token
            return res.status(200).send({
              tokenSession,
            });
          } else {
            // Passwords do not match, return an error message
            return res.status(401).json({ message: "Invalid password" });
          }
        } else {
          // For regular user login
          // Compare hashed passwords using bcrypt
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) {
            // Passwords match, generate a token
            const tokenSession = await tokenSign({
              id: user._id,
              role: user.roles,
            });

            // Return the user and token
            return res.status(200).send({
              tokenSession,
            });
          } else {
            // Passwords do not match, return an error message
            return res.status(401).json({ message: "Invalid password" });
          }
        }
      } else {
        // User not found, return an error message
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  LogoutUA: async (req, res) => {
    try {
      const { token } = req.body;

      // Verificar si se proporcionó un token
      if (!token) {
        return res.status(400).json({ message: "Token missing" });
      }

      // Verificar si el token es válido y decodificarlo para obtener la información del usuario
      const decodedToken = await verifyToken(token);

      if (!decodedToken) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      // Verificar si el token ha expirado
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return res.status(401).json({ message: "Token has expired" });
      }

      // Devolver una respuesta exitosa
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
