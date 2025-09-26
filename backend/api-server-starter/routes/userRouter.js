const router = require("express").Router();
const {
  registerUser,
  loginUser,
  verifyToken,
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyToken);

module.exports = router;
