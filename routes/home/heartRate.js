const express = require("express");
const router = express.Router();
const {
  addHeartRate,
  heartRateReports,
} = require("../../controllers/home/heartRate");
const { authenticateToken } = require("../../middleware/authMiddleware");

router.post("/addHeartRate", authenticateToken, addHeartRate);
router.get("/heartRateReports", authenticateToken, heartRateReports);

module.exports = router;
