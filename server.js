require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const ticketRoutes = require("./routes/ticketRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use("/api/tickets", ticketRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);


app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start Server
app.listen(PORT,'0.0.0.0', () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
