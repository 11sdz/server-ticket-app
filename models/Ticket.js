const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // Use Date type for ticket date
  location: { type: String, required: true }, // Location as a string
  officeNumber: { type: String, default: "" }, // office phone number
  mobileNumber: { type: String, default: "" }, // String of phone numbers (strings)
  personalName: { type: String, required: true }, // Creator as a string (can be name or ID)
  position: { type: String, required: true }, // Position as a string
  text: { type: String, required: true }, // Text of the ticket
  agent: { type: String, default: "" }, // Agent assigned to the ticket, default empty
  status: { type: String, default: "open" }, // Default status is open
  createdAt: { type: Date, default: Date.now }, // Timestamp when the ticket was created
  generatedTitle: { type: String, default: "" }, // Header for the ticket
});

module.exports = mongoose.model("Ticket", TicketSchema);
