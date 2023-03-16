const router = require("express").Router();
const AuthController = require("../controllers/authController");
const temp = require("../utils/middlewear");

router.post("/register", temp, AuthController.registerUser);
router.post("/login", temp, AuthController.loginUser);

module.exports = router;
