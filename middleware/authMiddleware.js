const jwt = require('jsonwebtoken');
require('dotenv').config();

// Protect middleware to verify JWT token and attach user info
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get the token from the "Authorization" header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    try {
        // Use the secret from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to the request
        next(); // Call next middleware or controller
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
};

module.exports = { protect };
