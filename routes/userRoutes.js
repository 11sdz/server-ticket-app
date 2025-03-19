const express = require('express');
const { getUserData } = require('../controllers/userController'); // Ensure this path is correct
const { protect } = require('../middleware/authMiddleware'); // Ensure the middleware is imported correctly

const router = express.Router();

// Define the route for getting user data
router.get('/', protect, getUserData);  // Use protect middleware to ensure only authenticated users can access

module.exports = router;
