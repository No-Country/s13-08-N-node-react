const UserSchema = require("../models/user.models.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Role = require("../models/role.models.js");
module.exports = {
  GetAllUsers: (req, res) => {
    UserSchema.find({}, " nombre apellido email")
      .then((data) => {
        if (!data || data.length === 0) {
          res.status(204).json({ message: "Users not found" });
        } else {
          res.status(200).json(data);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
      });
  },

  FindUser: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await UserSchema.findOne(
        { _id: id },
        { nombre: 1, apellido: 1, email: 1, _id: 0 }
      );
      if (data) {
        res.json(data);
      } else {
        res.json({ message: "User not found" });
      }
    } catch (error) {
      res.json({ message: error });
    }
  },

  //me falta agregar mas validaciones para contraseñas
  UpdateUser: async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.params.id.toString());
      //console.log("Valor de userId:", userId);

      // Verifica que req.body.password y req.body.email existan
      if (!req.body.password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const existingUser = await UserSchema.findById(userId).lean();

      // Verifica si el correo electrónico proporcionado es diferente al almacenado en la base de datos
      if (req.body.email && req.body.email !== existingUser.email) {
        return res.status(400).json({
          message:
            "Para actualizar usuario necesitas el correo que usaste para el registro.",
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const updatedUser = await UserSchema.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true, runValidators: true }
      ).lean();

      if (updatedUser) {
        console.log();
        res.status(200).json({ msg: "Contraseña actualizada con exito" });
      } else {
        res.status(401).json({ message: "Credenciales inválidas" });
      }
    } catch (error) {
      res.status(404).json({
        status: "no actualizado",
        message: error.message,
      });
    }
  },
  DeleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await UserSchema.findOneAndDelete({ _id: id });
      //console.log(user);
      if (user) {
        res.status(200).json({
          status: "Usuario borrado",
        });
      } else {
        res.status(400).json({
          status: "usuario no encontrado",
        });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({
        status: "no autorizado",
        message: error.message,
      });
    }
  },
};
