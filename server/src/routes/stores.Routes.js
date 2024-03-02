const express = require("express");
const router = express.Router();

const {
  CreateStore,
  GetAllStores,
  FindStore,
  UpdateStore,
  DeleteStore,
} = require("../controllers/stores.controller.js");
const { VoucherMiddleware } = require("../middlewares/stores.middlewares.js");
router.post("/create", CreateStore);
router.get("/", GetAllStores);
router.get("/:id", FindStore);
router.put("/:id", VoucherMiddleware, UpdateStore);
router.delete("/:id", VoucherMiddleware, DeleteStore);

module.exports = router;
