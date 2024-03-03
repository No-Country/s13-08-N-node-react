const bcrypt = require("bcrypt");
const baseUserSchema = require("../models/base.models.js");
const { tokenSign, verifyToken } = require("../helpers/generateToken.js");
const Role = require("../models/role.models.js");
const { emailRegistro } = require("../email/email.js");
const recyclingCompanySchema = require("../models/recyclingcompany.models.js");
module.exports = {
  RegisterCompany: async (req, res) => {
    try {
      const {
        nombreempresa,
        emailempresa,
        password,
        rubro,
        direccion,
        roleId,
      } = req.body;

      // Verificar si el correo electrónico ya está registrado
      const existingCompany = await recyclingCompanySchema.findOne({
        emailempresa,
      });
      if (existingCompany) {
        return res
          .status(400)
          .json({ error: "El correo electrónico ya está registrado" });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear la nueva empresa con el ID del rol
      const newCompany = new recyclingCompanySchema({
        nombreempresa,
        emailempresa,
        password: hashedPassword,
        rubro,
        direccion,
        roleId, // Asignar directamente el ID del rol
      });

      // Guardar la nueva empresa en la base de datos
      await newCompany.save();

      // Respuesta exitosa
      return res
        .status(201)
        .json({ message: "Empresa registrada exitosamente" });
    } catch (error) {
      console.error("Error al registrar empresa:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
    LoginCompany: async (req, res) => {
    try {
      const { emailempresa, password } = req.body;

      // Encuentra el usuario por su email
      const company = await recyclingCompanySchema.findOne({ emailempresa });

      // Verifica si el usuario existe
      if (company) {
        // Compara las contraseñas hasheadas usando bcrypt
        const isPasswordValid = bcrypt.compare(password, company.password);
        if (isPasswordValid) {
          // Obtén el nombre de la empresa
          const nombreempresa = company.nombreempresa;

          // Genera un token
          const tokenSession = await tokenSign({
            id: company._id,
          });

          // Retorna el tipo de usuario y el token
          return res.status(200).send({
            tokenSession,
            nombreempresa,
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
  LogoutCompany: async (req, res) => {
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
