const User = require("../models/User");

const getUserData = async (req, res) => {
    try {
        const userId = req.user.userId; // Get user ID from the request
        console.log("User ID from request:", req.user); // Log the user ID for debugging

        // Find user by ID
        const user = await User.findById(userId).select("-password"); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUserData }; // Export the function for use in routes
// Compare this snippet from routes/userRoutes.js: