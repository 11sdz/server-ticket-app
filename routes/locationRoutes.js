const express = require('express');
const { updateLocation, getAllLocations } = require('../controllers/LocationController'); // Ensure this path is correct
const { protect } = require('../middleware/authMiddleware'); // Ensure the middleware is imported correctly

const router = express.Router();

// Define the route for getting user data
router.post('/:userId/update', protect, updateLocation);  // Use protect middleware to ensure only authenticated users can access
router.get('/', protect, getAllLocations);  // Use protect middleware to ensure only authenticated users can access

module.exports = router;
