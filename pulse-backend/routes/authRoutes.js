const express = require("express");
const {login, registerAdmin, registerManager, registerUser} = require("../controllers/authController");
const {body} = require("express-validator");
const {requireRole, requireToken} = require("../middleware/authMiddleware");

// --- Internal

const router = express.Router();

const emailValidator = body("email")
    .isEmail().withMessage("Email must be valid")
    .normalizeEmail();

const passwordValidator = body("password")
    .isLength({min: 8}).withMessage("Password must be at least 8 characters")
    .matches(/[A-Za-z]/).withMessage("Password must include a letter")
    .matches(/\d/).withMessage("Password must include a number")
    .trim().escape();

router.post("/register-user", emailValidator, passwordValidator, registerUser);
router.post("/register-manager", requireToken, requireRole("admin"), emailValidator, passwordValidator, registerManager);
router.post("/register-admin", emailValidator, passwordValidator, registerAdmin);
router.post("/login", [emailValidator, body("password").notEmpty().trim().escape()], login);

// --- Exported

module.exports = router;