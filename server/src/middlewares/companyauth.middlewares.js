const { verifyToken, generateToken } = require("../helpers/generateToken.js");
const recyclingCompanySchema = require("../models/recyclingcompany.models.js"); // Suponiendo que este es tu esquema de empresa

module.exports = {
  CompanyAuthMiddleware: async (req, res, next) => {
    try {
      // Verificar si la ruta es pública (accesible sin autenticación)
      const isPublicRoute =
        req.path === "/loginCompany" ||
        req.path === "/RegisterRecyclingCompany";

      // Si es una ruta pública, permitir acceso sin verificar el token
      if (isPublicRoute) {
        next();
        return;
      }

      // Check if the Authorization header is present
      const token = req.headers.authorization?.split(" ").pop();
      if (!token) {
        res.status(401).send({ error: "Debes estar logueado" });
        return;
      }

      // Verify the token
      const tokenData = await verifyToken(token);
      // Comparar si la id del token es igual al id de la empresa
      const recyclingcompany = await recyclingCompanySchema.findById(
        tokenData._id
      );
      if (!recyclingcompany) {
        res.status(401).send({ error: "Empresa no encontrada" });
        return;
      }
      req.company = recyclingcompany;
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: "Error interno del servidor 2" });
    }
  },

  // CompanyLoginMiddleware: async (req, res, next) => {
  //   try {
  //     const { email, password } = req.body;

  //     // Autenticar a la empresa
  //     const company = await CompanySchema.findOne({ email, password });
  //     if (!company) {
  //       res.status(401).send({ error: "Credenciales inválidas" });
  //       return;
  //     }

  //     // Generar token
  //     const token = generateToken({ _id: company._id });

  //     // Devolver el token como respuesta
  //     res.status(200).send({ token });
  //   } catch (e) {
  //     console.error(e);
  //     res.status(500).send({ error: "Error interno del servidor 3" });
  //   }
  // },
};
