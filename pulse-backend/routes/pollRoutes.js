const express = require("express");
const {requireRole, requireToken} = require("../middleware/authMiddleware");
const {
    createPoll,
    votePoll,
    getPollResults,
    getOrgPolls,
    closePoll,
    openPoll
} = require("../controllers/pollController");

const router = express.Router();

router.post("/create-poll", requireToken, requireRole("manager"), createPoll);
router.post("/vote/:pollId", requireToken, requireRole("user"), votePoll);
router.get("/get-poll-results/:pollId", requireToken, getPollResults);
router.get("/get-polls/:organisationId", requireToken, getOrgPolls);
router.post("/close/:pollId", requireToken, requireRole("manager"), closePoll);
router.post("/open/:pollId", requireToken, requireRole("manager"), openPoll);

module.exports = router;