const express = require("express");
const { createTicket , getTickets } = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createTicket);
router.get("/", protect,getTickets);

module.exports = router;
