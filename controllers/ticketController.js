const Ticket = require("../models/Ticket");
require("dotenv").config();

const { generateTicketTitle } = require("../api/gemini");

const createTicket = async (req, res) => {
    try {
        const { text } = req.body; // Extract text from request
        if (!text) {
            return res.status(400).json({ error: "Text is required." });
        }
        const generatedTitle = await generateTicketTitle(text);
        console.log("Generated Title:", generatedTitle);

        const ticket = new Ticket({ ...req.body, generatedTitle }); // Create ticket object with generated title

        await ticket.save(); // Save to database
        res.status(201).json({ message: "Ticket saved", ticket });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

const getTickets = async (req, res) => {
    try {
        const { agent } = req.query; // Get agent from query parameters
        let query = {};

        if (agent) {
            query.agent = agent; // Filter tickets by agent if provided
        }

        const tickets = await Ticket.find(query);
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const patchTicket = async (req, res) => {
    try {
        const { ticketId } = req.params; // Extract ticketId from request parameters
        const updates = req.body; // Extract updates from request body

        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createTicket, getTickets,patchTicket };
