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
                imagen,
                valor,
            } = req.body;

            const materialExistente = await Material.findOne({ nombre });

            const valorExiste = await Material.findOne({ valor });

            if (materialExistente) {
                return res.status(400).json({ error: 'Material Existente' });
            }

            if (valorExiste) {
              return res.status(400).json({ error: 'Valor Existente' });
          }


            const nuevoMaterial = new Material({
                nombre,
                descripcion,
                imagen,
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

      // Eliminar todos los materiales
      deleteAllMaterials: async (req, res) => {
        try {
            await Material.deleteMany({});
            res.status(200).json({ message: "Todos los materiales han sido eliminados" });
        } catch (error) {
            console.error("Error al eliminar todos los materiales:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // Eliminar un material por su ID
    deleteMaterialById: async (req, res) => {
        try {
            const { id } = req.params;
            const materialEliminado = await Material.findByIdAndDelete(id);
            if (!materialEliminado) {
                return res.status(404).json({ error: "Material no encontrado" });
            }
            res.status(200).json({ message: "Material eliminado correctamente" });
        } catch (error) {
            console.error("Error al eliminar material por ID:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // Editar un material por su ID
    editMaterialById: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                nombre,
                descripcion,
                imagen,
                valor,
            } = req.body;

            // Verificar si el material existe
            const materialExistente = await Material.findById(id);
            if (!materialExistente) {
                return res.status(404).json({ error: "Material no encontrado" });
            }

            // Actualizar los campos editables
            materialExistente.nombre = nombre;
            materialExistente.descripcion = descripcion;
            materialExistente.imagen = imagen;
            materialExistente.valor = valor;

            // Guardar los cambios
            const materialActualizado = await materialExistente.save();

            res.status(200).json(materialActualizado);
        } catch (error) {
            console.error("Error al editar material por ID:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

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
      const imagen = await GenerateQRcode(userId);

      // Guardar el código QR en la base de datos asociado al usuario
      const material = new Material({
        nombre: userId.nombre,
        descripción: userId.descripción,
        imagen,
        valor: userId.valor,
        categoria: userId.categoria,
        imagen: userId.imagen,
      });
      await material.save();

      res.status(201).json({ imagen });
    } catch (error) {
      console.error("Error al generar el código QR:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
