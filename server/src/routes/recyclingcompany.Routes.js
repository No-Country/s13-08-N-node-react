const express = require("express");
const router = express.Router();

const {
  GetAllRecyclingCompany,
  FindRecyclingCompany,
  UpdateRecyclingCompany,
  DeleteRecyclingCompany,
} = require("../controllers/recyclingCompany.controllers.js");
const {
  CompanyAuthMiddleware,
} = require("../middlewares/companyauth.middlewares.js");
router.get("/GetAllRecyclingCompany", GetAllRecyclingCompany);
router.get("/FindRecyclingCompany/:id", FindRecyclingCompany);
router.put(
  "/UpdateRecyclingCompany/:id",
  CompanyAuthMiddleware,
  UpdateRecyclingCompany
);
router.delete("/DeleteRecyclingCompany/:id", DeleteRecyclingCompany);
module.exports = router;
