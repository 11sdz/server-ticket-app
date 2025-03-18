require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Ticket = require("./models/Ticket");
//const { db, collection, doc, setDoc } = require("./firebase");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

connectDB();

// API Route to receive service tickets
app.post("/api/tickets", async (req, res) => {
    try {
        const ticket = new Ticket(req.body);

        await ticket.save();
        res.status(201).json({ message: "Ticket saved", ticket });

        // Save ticket data to Firestore
        // const ticketData = {
        //     title: ticket.title,
        //     date: ticket.date,
        //     location: ticket.location,
        //     officeNumber: ticket.officeNumber,
        //     mobileNumber: ticket.mobileNumber,
        //     personalName: ticket.personalName,
        //     position: ticket.position,
        //     text: ticket.text,
        //     agent: ticket.agent,
        //     status: ticket.status,
        //     createdAt: ticket.createdAt,
        //   };
        // const ticketRef = doc(db, "tickets", ticket.title);
        // await setDoc(ticketRef, ticketData);
        // res.status(201).json({ message: "Ticket saved", ticket });
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});

app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start Server
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
