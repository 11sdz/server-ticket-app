const mongoose = require('mongoose');
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
        const { _id } = req.params; // Extract ticketId from request parameters
        const updates = req.body; // Extract updates from request body

        // Ensure the ticketId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: "Invalid ticket ID" });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            _id,
            updates,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addCommentToTicket = async (req, res) => {
    try {
        const { _id } = req.params; // ticket ID
        const { authorId, authorName, content } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: "Invalid ticket ID" });
        }

        if (!authorId || !authorName || !content) {
            return res.status(400).json({ error: "Missing comment data" });
        }

        const comment = {
            authorId,
            authorName,
            content,
            timestamp: new Date()
        };

        const updatedTicket = await Ticket.findByIdAndUpdate(
            _id,
            { $push: { comments: comment } },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.status(200).json({ message: "Comment added", ticket: updatedTicket });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTicket, getTickets, patchTicket , addCommentToTicket };
