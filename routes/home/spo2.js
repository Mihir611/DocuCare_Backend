const express = require("express");
const router = express.Router();
const { addSPO2, SPO2Reports } = require("../../controllers/home/spo2");
const { authenticateToken } = require("../../middleware/authMiddleware");

router.post("/addSPO2", authenticateToken, addSPO2);
router.get("/SPO2Reports", authenticateToken, SPO2Reports);

module.exports = router;
