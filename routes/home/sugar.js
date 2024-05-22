const express = require("express");
const router = express.Router();
const {
  addSugar,
  sugarReports,
} = require("../../controllers/home/sugar");
const { authenticateToken } = require("../../middleware/authMiddleware");

router.post("/addSugar", authenticateToken, addSugar);
router.get("/sugarReports", authenticateToken, sugarReports);

module.exports = router;