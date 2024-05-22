const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  protectedRoute,
  readUser,
  editUser,
  deleteUser
} = require("../../controllers/users/userController");
const { authenticateToken } = require("../../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", authenticateToken, protectedRoute);
router.get("/readUser", authenticateToken, readUser);
router.put("/editUser", authenticateToken, editUser);
router.delete("/deleteUser", authenticateToken, deleteUser);

module.exports = router;
