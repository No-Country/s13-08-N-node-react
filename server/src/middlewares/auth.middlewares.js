const { verifyToken } = require("../helpers/generateToken.js");
const userSchema = require("../models/user.models.js");

module.exports = {
  AuthMiddleware: async (req, res, next) => {
    try {
      // Verificar si la ruta es pública (accesible sin autenticación)
      const isPublicRoute =
        req.path === "/" ||
        req.path === "/registerUser" ||
        req.path === "/loginUser";

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
      //comparara si la id del token es igual al id del user
      const user = await userSchema.findById(tokenData._id);
      req.user = user;
      console.log(tokenData);
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: "Internal server error" });
    }
  },
  // isAdmin: async (req, res, next) => {
  //   try {
  //     const authToken = req.headers.authorization;
  //     if (!authToken) {
  //       return res.status(401).json({ error: "Token not provided" });
  //     }

  //     // Extraer el token del encabezado de autorización
  //     const token = authToken.split(" ")[1];

  //     // Verificar el token
  //     const userData = await verifyToken(token);
  //     console.log(userData);
  //     if (!userData || !userData._id) {
  //       return res.status(401).json({ error: "Invalid token data" });
  //     }

  //     // Buscar al usuario en la base de datos
  //     const user = await UserSchema.findById(userData._id);
  //     if (!user) {
  //       return res.status(404).json({ error: "User not found" });
  //     }

  //     // Verificar el rol del usuario
  //     if (user.role !== "admin") {
  //       return res.status(401).json({ error: "You are not an admin" });
  //     }

  //     // Almacenar el ID del usuario en la solicitud para su uso posterior si es necesario
  //     req.userId = user._id;

  //     // Si todo está bien, pasar al siguiente middleware
  //     next();
  //   } catch (error) {
  //     // Si hay algún error, responder con un estado 500 y un mensaje de error
  //     console.error(error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // },
};
