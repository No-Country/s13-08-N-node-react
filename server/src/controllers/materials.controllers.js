const GenerateQRcode = require("../utils/qrgenerator.js");
const { decodeToken } = require("../helpers/generateToken.js");
const Material = require("../models/material.models.js");
//const User = require("../models/user.models.js");


module.exports = {

  // http://localhost:3000/materials/create
  
    createMaterial: async (req, res) => {
        try {
            const {
                nombre,
                descripcion,
                codigoQR,
                valor,
            } = req.body;

            const materialExistente = await Material.findOne({ nombre });
            if (materialExistente) {
                return res.status(400).json({ error: 'Material Existente' });
            }

            const nuevoMaterial = new Material({
                nombre,
                descripcion,
                codigoQR,
                valor,
            });

            const materialGuardado = await nuevoMaterial.save();


            res.status(201).json(materialGuardado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // http://localhost:3000/materials
    getAllMaterials: async (req, res) => {

      try {
        const materiales = await Material.find()
        res.status(200).json(materiales)        
      } catch (error) {
        console.error("Error al obtener materiales:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }

    },

  //   {
  //     "nombre": "Botellas de plastico",
  //     "descripcion": "Botellas recolectadas tras el consumo de bebidas",
  //     "valor": "1400",
  //     "categoriaId": "65d78377fbe39058ff367005",
  //     "imagen": "imagen.png"
  // }

  getUserDetails: async (userId) => {
    try {
      // Consultar el usuario en la base de datos utilizando Mongoose
      const user = await User.findById(userId);

      // Verificar si se encontró el usuario
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Devolver los detalles del usuario encontrados
      return {
        nombre: user.nombre,
        descripción: user.descripción,
        valor: user.valor,
        categoria: user.categoria,
        imagen: user.imagen,
      };
    } catch (error) {
      // Manejar cualquier error que ocurra durante la consulta
      console.error("Error al obtener los detalles del usuario:", error);
      throw error; // Relanzar el error para que pueda ser manejado por el controlador
    }
  },

  QRGenerator: async (req, res) => {
    try {
      // Verificar si el token está presente en los headers de la solicitud
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
      }

      // Decodificar el token para obtener la información del usuario
      const decodedToken = await decodeToken(token);
      console.log(decodedToken);
      if (!decodedToken || !decodedToken._id) {
        return res.status(401).json({ error: "Token inválido" });
      }

      const userId = decodedToken._id;

      // Verificar si userId tiene la estructura esperada
      if (!userId || typeof userId !== "object" || !userId.nombre) {
        return res.status(400).json({ error: "Datos de usuario no válidos" });
      }

      // Generar el código QR
      const codigoQR = await GenerateQRcode(userId);

      // Guardar el código QR en la base de datos asociado al usuario
      const material = new Material({
        nombre: userId.nombre,
        descripción: userId.descripción,
        codigoQR,
        valor: userId.valor,
        categoria: userId.categoria,
        imagen: userId.imagen,
      });
      await material.save();

      res.status(201).json({ codigoQR });
    } catch (error) {
      console.error("Error al generar el código QR:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};


// const GenerateQRcode = require("../utils/qrgenerator.js");
// const { decodeToken } = require("../helpers/generateToken.js");
// const Material = require("../models/material.models.js");
// //const User = require("../models/user.models.js");
// module.exports = {
//   getUserDetails: async (userId) => {
//     try {
//       // Consultar el usuario en la base de datos utilizando Mongoose
//       const user = await User.findById(userId);

//       // Verificar si se encontró el usuario
//       if (!user) {
//         throw new Error("Usuario no encontrado");
//       }

//       // Devolver los detalles del usuario encontrados
//       return {
//         nombre: user.nombre,
//         descripción: user.descripción,
//         valor: user.valor,
//         categoria: user.categoria,
//         imagen: user.imagen,
//       };
//     } catch (error) {
//       // Manejar cualquier error que ocurra durante la consulta
//       console.error("Error al obtener los detalles del usuario:", error);
//       throw error; // Relanzar el error para que pueda ser manejado por el controlador
//     }
//   },

//   QRGenerator: async (req, res) => {
//     try {
//       // Verificar si el token está presente en los headers de la solicitud
//       const token = req.headers.authorization;

//       if (!token) {
//         return res.status(401).json({ error: "Token no proporcionado" });
//       }

//       // Decodificar el token para obtener la información del usuario
//       const decodedToken = await decodeToken(token);
//       console.log(decodedToken);
//       if (!decodedToken || !decodedToken._id) {
//         return res.status(401).json({ error: "Token inválido" });
//       }

//       const userId = decodedToken._id;

//       // Verificar si userId tiene la estructura esperada
//       if (!userId || typeof userId !== "object" || !userId.nombre) {
//         return res.status(400).json({ error: "Datos de usuario no válidos" });
//       }

//       // Generar el código QR
//       const codigoQR = await GenerateQRcode(userId);

//       // Guardar el código QR en la base de datos asociado al usuario
//       const material = new Material({
//         nombre: userId.nombre,
//         descripción: userId.descripción,
//         codigoQR,
//         valor: userId.valor,
//         categoria: userId.categoria,
//         imagen: userId.imagen,
//       });
//       await material.save();

//       res.status(201).json({ codigoQR });
//     } catch (error) {
//       console.error("Error al generar el código QR:", error);
//       res.status(500).json({ error: "Error interno del servidor" });
//     }
//   },
// };
