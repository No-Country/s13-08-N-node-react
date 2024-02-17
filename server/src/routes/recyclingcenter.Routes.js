const express = require("express");
const router = express.Router();

const { createPoint, getAllPoints, getPointById ,filterPointsByLatLng } = require("../controllers/recyclingcenter.controllers")

router.get("/points", getAllPoints)
router.post("/points", createPoint )
router.get("/point/:id", getPointById)

router.get("/filter-points", filterPointsByLatLng);

module.exports = router;