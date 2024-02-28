const recyclingCompanySchema = require("../models/recyclingcompany.models.js");
const bcrypt = require("bcrypt");
const { passwordValidator } = require("../validators/validators.js");

module.exports = {
  GetAllRecyclingCompany: async (req, res) => {
    try {
      const RecyclingCompanySaved = await recyclingCompanySchema.find();
      res.status(201).json(RecyclingCompanySaved);
    } catch (error) {
      console.error("Error al obtener el listado de compañias:", error);
      res
        .status(500)
        .json({ error: "Ocurrió un error al obtener el listado de compañias" });
    }
  },
  FindRecyclingCompany: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await recyclingCompanySchema.findOne(
        { _id: id },
        { nombreempresa: 1, emailempresa: 1, _id: 0 }
      );
      if (data) {
        res.json(data);
      } else {
        res.json({ message: "Company not found" });
      }
    } catch (error) {
      res.json({ message: error });
    }
  },

  UpdateRecyclingCompany: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombreempresa, rubro, emailempresa, direccion, password } =
        req.body;
      // Validar la contraseña antes de hacer el hash
      if (password) {
        const isValidPassword = passwordValidator.every((validator) =>
          validator.validator(password)
        );
        if (!isValidPassword) {
          return res.status(400).json({ error: "Contraseña no válida" });
        }
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      // Actualizar la compañía de reciclaje, incluyendo la contraseña proporcionada
      const UpdatedRecyclingCompany =
        await recyclingCompanySchema.findByIdAndUpdate(
          id,
          {
            nombreempresa: nombreempresa,
            rubro: rubro,
            emailempresa: emailempresa,
            direccion: direccion,
            password: hashedPassword, // La contraseña proporcionada se guardará como un hash automáticamente
          },
          { new: true }
        );

      res.status(200).json(UpdatedRecyclingCompany);
    } catch (error) {
      console.error("Error al actualizar la compañia:", error);
      res.status(500).json({
        error: "Ocurrió un error al actualizar la compañia",
      });
    }
  },

  DeleteRecyclingCompany: async (req, res) => {
    try {
      const { id } = req.params;
      await recyclingCompanySchema.findByIdAndDelete(id);
      res.status(200).json({ message: "Empresa eliminada exitosamente" }); // Modificación aquí
    } catch (error) {
      console.error("Error al eliminar la compañia:", error);
      res
        .status(500)
        .json({ error: "Ocurrió un error al eliminar la compañia" });
    }
  },
};
