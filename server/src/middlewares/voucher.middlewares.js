const { verifyToken } = require("../helpers/generateToken.js");
const recyclingCompanySchema = require("../models/recyclingcompany.models.js");
module.exports = {
  VoucherMiddleware: async (req, res, next) => {
    try {
      // Verificar si la ruta es para actualizar o eliminar un voucher
      const isVoucherUpdateOrDeleteRoute =
        req.path.match(/^\/vouchers\/[^/]+$/) &&
        (req.method === "PUT" || req.method === "DELETE");
      if (isVoucherUpdateOrDeleteRoute) {
        const token = req.headers.authorization?.split(" ").pop();
        if (!token) {
          return res.status(401).send({ error: "Debes estar logueado" });
        }

        // Verificar el token
        const tokenData = await verifyToken(token);
        // Comparar si la id del token es igual a la id del voucher
        const voucher = await VoucherSchema.findById(tokenData._id);
        if (!voucher) {
          return res.status(401).send({ error: "Voucher no encontrado" });
        }
        req.voucher = voucher;
      }
      // Continuar con la siguiente middleware
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: "Error interno del servidor" });
    }
  },
};
