const express = require("express");
const router = express.Router();

const { createPoint, getAllPoints, getPointById, filterPointsByLatLng } = require("../controllers/recyclingcenter.controllers")

router.get("/points", getAllPoints)
router.post("/points", createPoint )
router.get("/points/:id", getPointById)


// http://localhost:3000/recycking-center/filter-points?lat=-34.585305&lng=-58.4365416
router.get("/filter-points", filterPointsByLatLng);

module.exports = router;