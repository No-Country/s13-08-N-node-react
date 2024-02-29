const express = require("express");
const router = express.Router();

const { createPoint, getAllPoints, getPointById ,filterPointsByLatLng, filterPointsByMaterial, editPointById, deletePointById, deleteAllPoints } = require("../controllers/recyclingcenter.controllers")

router.get("/points", getAllPoints)
router.post("/create", createPoint )
router.get("/point/:id", getPointById)

router.get("/filter-points", filterPointsByLatLng);

router.get('/filter-points-by-materials/:materialName([a-zA-Z]+)', (req, res, next) => {
    req.params.materialName = req.params.materialName.charAt(0).toUpperCase() + req.params.materialName.slice(1).toLowerCase();
    next();
}, filterPointsByMaterial);

router.put("/edit/:id", editPointById);

router.delete("/delete/:id", deletePointById);
router.delete("/delete", deleteAllPoints);

module.exports = router;