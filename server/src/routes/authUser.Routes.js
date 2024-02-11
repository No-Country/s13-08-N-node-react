const express = require("express");
const router = express.Router();

const {
  LoginUA,
  RegisterUser,
  LogoutUA,
} = require("../controllers/auth.controllers.js");

router.post("/registerUser", RegisterUser);
router.post("/loginUser", LoginUA);
router.post("/logoutUser", LogoutUA);

module.exports = router;
