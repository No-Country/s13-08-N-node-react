const express = require("express");
const router = express.Router();

const {
  RegisterUA,
  LoginUA,
  LogoutUA,
} = require("../controllers/auth.controllers.js");

router.post("/registerAdmin", RegisterUA);
router.post("/loginAdmin", LoginUA);
router.post("/logoutAdmin", LogoutUA);

module.exports = router;
