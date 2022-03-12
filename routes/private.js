const express = require("express");
const router = express.Router();
const { getPrivateData, uploadfile } = require("../controllers/private");
const { protect, superprotect } = require("../middleware/auth");

router.route("/").get(protect, getPrivateData);
router.route("/superadmin").get(superprotect, getPrivateData);
router.route("/upload").post(protect, uploadfile);

module.exports = router;
