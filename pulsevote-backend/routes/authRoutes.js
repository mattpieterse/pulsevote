const express = require("express");
const {signUp, signIn} = require("../controllers/authController");

// --- Internal

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);

// --- Exported

module.exports = router;