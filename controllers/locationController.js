const mongoose = require('mongoose');
const Location = require('../models/Location');
const User = require('../models/User');  // Import User model
const UserStatus = require('../models/UserStatus');

const updateLocation = async (req, res) => {
    console.log('Received request to update location:', req.body);
    const { userId } = req.params;
    const { latitude, longitude } = req.body;
    
    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    try {
        console.log('Updating location for user:', userId, 'with coordinates:', latitude, longitude);
        const user = await User.findById(userId);  // Ensure you're looking for the user by _id
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update location
        const location = await Location.findOneAndUpdate(
            { userId },  // Ensure the userId matches the field in your location schema
            { coordinates: [longitude, latitude] },  // Correct format for coordinates
            { new: true, upsert: true }  // Create the document if it doesn't exist
        );

        return res.status(200).json(location);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

const getAllLocations = async (req, res) => {
    console.log('Received request to get all locations');
    try {
        const locations = await Location.find()
            .populate('userId', 'firstName lastName');  // Populating the userId field with firstName and lastName

        if (!locations || locations.length === 0) {
            return res.status(404).json({ message: 'No locations found' });
        }

        console.log("Locations:", locations);
        return res.status(200).json(locations);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    updateLocation,
    getAllLocations
};
