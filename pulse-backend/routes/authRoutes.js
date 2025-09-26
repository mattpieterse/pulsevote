const express = require("express");
const authController = require("../controllers/authController");
const {body} = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const {registerLimiter, loginLimiter} = require("../middleware/rateLimiter")

const router = express.Router();

const emailValidator = body("email")
    .isEmail().withMessage("Email must be valid")
    .normalizeEmail();

const passwordValidator = body("password")
    .isLength({min: 8}).withMessage("Password must be at least 8 characters")
    .matches(/[A-Za-z]/).withMessage("Password must include a letter")
    .matches(/\d/).withMessage("Password must include a number")
    .trim().escape();

router.post("/register-user", registerLimiter, emailValidator, passwordValidator, authController.registerUser);
router.post("/register-manager", authMiddleware.requireToken, authMiddleware.requireRole("admin"), registerLimiter, emailValidator, passwordValidator, authController.registerManager);
router.post("/register-admin", registerLimiter, emailValidator, passwordValidator, authController.registerAdmin);
router.post("/login", loginLimiter, [emailValidator, body("password").notEmpty().trim().escape()], authController.login);

module.exports = router;