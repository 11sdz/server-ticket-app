const express = require("express");
const { createTicket , getTickets, patchTicket, addCommentToTicket } = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createTicket);
router.get("/", protect,getTickets);
router.patch("/:_id", protect, patchTicket); // Added patch route
router.post("/:_id/comments", protect, addCommentToTicket); // Added comment route

module.exports = router;
