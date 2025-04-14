const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  authorId: { type: String, required: true }, // ניתן גם להשתמש ב-Type: mongoose.Schema.Types.ObjectId אם זה קשור למשתמשים
  authorName: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  officeNumber: { type: String, default: "" },
  mobileNumber: { type: String, default: "" },
  personalName: { type: String, required: true },
  position: { type: String, required: true },
  text: { type: String, required: true },
  agent: { type: String, default: "" },
  status: { type: String, default: "open" },
  createdAt: { type: Date, default: Date.now },
  generatedTitle: { type: String, default: "" },
  comments: [CommentSchema]
});

module.exports = mongoose.model("Ticket", TicketSchema);
