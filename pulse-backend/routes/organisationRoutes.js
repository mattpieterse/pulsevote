const express = require("express");
const {requireRole, requireToken} = require("../middleware/authMiddleware");
const {
    createOrganisation,
    generateJoinCode,
    joinOrganisation
} = require("../controllers/organisationController");

const router = express.Router();

router.post("/create-organisation", requireToken, requireRole("manager"), createOrganisation);
router.post("/generate-join-code/:organisationId/", requireToken, requireRole("manager"), generateJoinCode);
router.post("/join-organisation", requireToken, joinOrganisation);

module.exports = router;