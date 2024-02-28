const express = require("express");
const router = express.Router();

const {
  CreateVoucher,
  GetAllVouchers,
  FindVoucher,
  UpdateVoucher,
  DeleteVoucher,
} = require("../controllers/voucher.controller.js");
const { VoucherMiddleware } = require("../middlewares/voucher.middlewares.js");
router.post("/create", CreateVoucher);
router.get("/", GetAllVouchers);
router.get("/:id", FindVoucher);
router.put("/:id", VoucherMiddleware, UpdateVoucher);
router.delete("/:id", VoucherMiddleware, DeleteVoucher);

module.exports = router;
