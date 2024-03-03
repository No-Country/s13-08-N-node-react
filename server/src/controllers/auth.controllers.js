const bcrypt = require("bcrypt");
const UserSchema = require("../models/user.models.js");
const baseUserSchema = require("../models/base.models.js");
const { emailValidator, passwordValidator } = require("../utils/validators.js");
const { tokenSign, verifyToken } = require("../helpers/generateToken.js");
const Role = require("../models/role.models.js");
const { emailRegistro } = require("../email/email.js");

module.exports = {
    LoginUA: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Encuentra el usuario por su email
      const user = await baseUserSchema.findOne({ email }).populate("roles");

      // Verifica si el usuario existe
      if (user) {
        // Compara las contraseñas hasheadas usando bcrypt
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          // Verifica si el usuario es administrador
          const isAdmin = user.roles.some((role) => role.name === "Admin");

          // Obtén el nombre del usuario
          const nombre = user.nombre;

          // Genera un token
          const tokenSession = await tokenSign({
            id: user._id,
            role: user.roles,
            nombre: user.nombre, // Incluye el nombre del usuario en el token
          });

          // Retorna el tipo de usuario y el token
          return res.status(200).send({
            tokenSession,
            isAdmin,
            nombre, // Envía el nombre del usuario en la respuesta
            email: user.email,
          });
        } else {
          // Las contraseñas no coinciden, retorna un mensaje de error
          return res.status(401).json({ message: "Contraseña inválida" });
        }
      } else {
        // Usuario no encontrado, retorna un mensaje de error
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
  RegisterUA: async (req, res) => {
    try {
      const { nombre, email, password } = req.body;
      const isAdminRoute = req.originalUrl.includes("Admin"); // Verifica si la ruta contiene "admin"
      const roleName = isAdminRoute ? "Admin" : "User";

      // Buscar el rol correspondiente en la base de datos
      const roleObj = await Role.findOne({ name: roleName });
      if (!roleObj) {
        return res.status(500).json({
          error: `No se encontró el rol '${roleName}' en la base de datos`,
        });
      }

      // Verificar si el correo electrónico ya está registrado
      const existingUser = await baseUserSchema.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "El correo electrónico ya está registrado" });
      }

      // Crear el nuevo usuario con el rol asignado
      const newUser = new baseUserSchema({
        nombre,
        email,
        password,
        roles: [roleObj._id], // Asignar el ID del rol correspondiente al usuario
      });

      // Guardar el nuevo usuario en la base de datos
      const savedUser = await newUser.save();

      //Enviar email de confirmación
      emailRegistro({
        email: newUser.email,
        nombre: newUser.nombre,
      });

      // Respuesta exitosa
      return res.status(201).json({
        message: isAdminRoute
          ? "Administrador registrado exitosamente"
          : "Usuario registrado exitosamente",
      });
    } catch (error) {
      console.error("Error al registrar usuario/administrador:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
