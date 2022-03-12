const express = require("express");

const router = express.Router();

const { servicesscreen, update } = require("../controllers/servicesscreen");

const { protect } = require("../middleware/auth");

router.route("/").get(servicesscreen);

router.route("/:id").put(protect, update);

module.exports = router;
