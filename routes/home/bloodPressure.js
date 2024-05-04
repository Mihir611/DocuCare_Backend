const express = require("express");
const router = express.Router();
const {
  addBloodPressure,
  bloodPressureReports,
} = require("../../controllers/home/bloodPressure");
const { authenticateToken } = require("../../middleware/authMiddleware");

router.post("/addBloodPressure", authenticateToken, addBloodPressure);
router.get("/bloodPressureReport", authenticateToken, bloodPressureReports);

module.exports = router;
