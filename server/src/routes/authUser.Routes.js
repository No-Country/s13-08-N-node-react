const express = require("express");
const router = express.Router();

const {
  LoginUA,
  RegisterUA,
  LogoutUA,
} = require("../controllers/auth.controllers.js");

router.post("/registerUser", RegisterUA);
router.post("/loginUser", LoginUA);
router.post("/logoutUser", LogoutUA);

module.exports = router;
