const mongoose = require("mongoose");
const VoucherSchema = require("../models/vouchercompany.models.js");
const StoreSchema = require("../models/stores.models.js");
const MaterialSchema = require("../models/material.models.js");
const {
  Types: { ObjectId },
} = require("mongoose");

const bcrypt = require("bcrypt");
const {
  verifyCompanyToken,
  tokenSign,
  decodeCompanyToken,
} = require("../helpers/generateToken.js");

module.exports = {
  CreateVoucher: async (req, res) => {
    try {
      const { titulo, stores, duracion, recycledMaterials } = req.body;
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
      }

      const token = authHeader.split(" ")[1];

      const decodedToken = await verifyCompanyToken(token);
      const empresaId = decodedToken._id;

      if (!empresaId) {
        return res.status(401).json({
          error: "No se pudo encontrar la ID de la empresa en el token",
        });
      }

      const storeIds = [];
      for (const storeName of stores) {
        const store = await StoreSchema.findOne({ nombrestore: storeName });
        if (store) {
          storeIds.push(store._id);
        } else {
          console.error(`Store "${storeName}" not found`);
          return res
            .status(404)
            .json({ error: `Tienda "${storeName}" no encontrada` });
        }
      }

      // Verificar si recycledMaterials es un array
      if (!Array.isArray(recycledMaterials)) {
        return res
          .status(400)
          .json({ error: "Recycled materials debe ser un array" });
      }

      // Buscar los IDs de los materiales reciclados
      const recycledMaterialIds = [];
      for (const materialName of recycledMaterials) {
        const material = await MaterialSchema.findOne({
          nombrematerial: materialName,
        });
        if (material) {
          recycledMaterialIds.push(material._id);
        } else {
          console.error(`Material "${materialName}" not found`);
          // Puedes manejar el caso de que un material no se encuentre, por ejemplo, retornando un error o ignorándolo.
        }
      }

      // Calcular los puntos a partir de los materiales reciclados
      let totalPuntos = 0;
      for (const materialId of recycledMaterialIds) {
        const material = await MaterialSchema.findById(materialId);
        if (material) {
          totalPuntos += material.calcularPuntos();
        }
      }

      const newVoucher = new VoucherSchema({
        titulo,
        ptoscanjevoucher: totalPuntos,
        stores: storeIds,
        duracion,
        recyclingcompany: empresaId,
        recycledMaterials: recycledMaterialIds, // Aquí se utilizan los IDs encontrados
      });

      await newVoucher.save();

      return res.status(201).json({ message: "Voucher creado exitosamente" });
    } catch (error) {
      console.error("Error al crear voucher:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  GetAllVouchers: (req, res) => {
    VoucherSchema.find({}, "empresa_reciclaje,duracion") // ver en front cuales son los capos de voucher a mostrar
      .then((data) => {
        if (!data || data.length === 0) {
          res.status(204).json({ message: "Vouchers not found" });
        } else {
          res.status(200).json(data);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
      });
  },

  FindVoucher: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await VoucherSchema.findOne({ _id: id });
      if (data) {
        res.json(data);
      } else {
        res.json({ message: "Voucher not found" });
      }
    } catch (error) {
      res.json({ message: error });
    }
  },

  UpdateVoucher: async (req, res) => {
    try {
      const VoucherId = new mongoose.Types.ObjectId(req.params.id.toString());

      // Verificar si el voucher existe
      const existingVoucher = await VoucherSchema.findById(VoucherId);
      if (!existingVoucher) {
        return res.status(404).json({ message: "Voucher not found" });
      }

      // Aplicar los cambios al voucher existente
      existingVoucher.duracion = req.body.duracion;

      // Guardar el voucher actualizado en la base de datos
      await existingVoucher.save();

      // Respuesta exitosa
      return res.status(200).json({ message: "Voucher updated successfully" });
    } catch (error) {
      console.error("Error updating voucher:", error);
      return res.status(500).json({ error: "Error updating voucher" });
    }
  },

  DeleteVoucher: async (req, res) => {
    const { id } = req.params;

    try {
      const Voucher = await VoucherSchema.findOneAndDelete({ _id: id });
      //console.log(user);
      if (Voucher) {
        res.status(200).json({
          status: "Voucher borrado",
        });
      } else {
        res.status(400).json({
          status: "Voucher no encontrado",
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

