const express = require("express");
const router = express.Router();

const {
  RegisterCompany,
  LoginCompany,
  LogoutCompany,
} = require("../controllers/companyAuth.controller.js");
//tratar de integrar el loginUA a empresa
router.post("/RegisterRecyclingCompany", RegisterCompany);
router.post("/loginCompany", LoginCompany);
router.post("/logoutCompany", LogoutCompany);

module.exports = router;
