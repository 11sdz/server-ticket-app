const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json({ message: "Ticket saved", ticket });
    } catch (error) {
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
}

module.exports = { createTicket, getTickets };
