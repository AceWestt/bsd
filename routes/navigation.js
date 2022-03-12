const express = require("express");

const router = express.Router();

const { navigation, update } = require("../controllers/navigation");

const { protect } = require("../middleware/auth");

router.route("/").get(navigation);
router.route("/:id").put(protect, update);

module.exports = router;
