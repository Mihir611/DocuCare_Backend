const express = require("express");
const router = express.Router();
const {
  addSugar,
  sugarReports,
} = require("../../controllers/home/sugar");
const { authenticateToken } = require("../../middleware/authMiddleware");

router.post("/addHeartRate", authenticateToken, addSugar);
router.get("/heartRateReports", authenticateToken, sugarReports);

module.exports = router;