const express = require("express");
const router = express.Router();

const { QRGenerator } = require("../controllers/materials.controllers.js");

router.post("/QRGenerator", QRGenerator);

module.exports = router;
