const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserStatus = require("../models/UserStatus");

const register = async (req, res) => {
    const { username, password, firstName, lastName, email, passkey } =
        req.body;

    try {
        console.log("Received registration request:", req.body);
        // Check if user already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        let userRole = 'user'; // Default role
        if (passkey === process.env.ADMIN_PASSKEY) {
            userRole = 'admin'; // Set role to admin if passkey is correct
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Include all required fields in User
        const newUser = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            role: userRole,
        });

        await newUser.save();

        // Create an initial status document for the user (initial status will be "offline")
        const newStatus = new UserStatus({
            userId: newUser._id,
            status: 'offline',  // Initial status can be 'offline' or 'in-work' depending on your business logic
        });

        // Save the status document
        await newStatus.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },  // Use `userId` and `username`
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "3h" }
        );
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register, login };
