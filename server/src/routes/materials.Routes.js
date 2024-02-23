const express = require("express");
const router = express.Router();

const { QRGenerator, createMaterial, getAllMaterials } = require("../controllers/materials.controllers.js");

router.post("/QRGenerator", QRGenerator);
router.post("/create", createMaterial);
router.get("/", getAllMaterials);

module.exports = router;
