const express = require("express");

const router = express.Router();

const {
  portfolioscreen,
  addwork,
  deletework,
  update,
} = require("../controllers/portfolioscreen");

const { protect } = require("../middleware/auth");

router.route("/").get(portfolioscreen);
router.route("/:id").put(protect, update);
router.route("/:id/work/:workid").put(protect, addwork);
router.route("/:id/work/:workid").delete(protect, deletework);

module.exports = router;
