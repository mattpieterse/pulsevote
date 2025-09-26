const express = require("express");
const {signUp, signIn} = require("../controllers/authController");
const {body} = require("express-validator");

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

router.post("/signUp", emailValidator, passwordValidator, signUp);
router.post("/signIn", [emailValidator, body("password").notEmpty().trim().escape()], signIn);

// --- Exported

module.exports = router;