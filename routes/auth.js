const express = require("express");

const router = express.Router();

const {
  initsuperadmin,
  login,
  forgotpassword,
  resetpassword,
} = require("../controllers/auth");

router.route("/initsuperadmin").get(initsuperadmin);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

module.exports = router;
