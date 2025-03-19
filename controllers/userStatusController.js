const UserStatus = require('../models/UserStatus');  // Make sure you import UserStatus correctly
const User = require('../models/User');

const updateUserStatus = async (req, res) => {
    try {
        const { userId, status } = req.body;
        const userStatus = await UserStatus.findOneAndUpdate(
            { userId },
            { firstName: req.body.firstName, lastName: req.body.lastName, status },
            { new: true, upsert: true }
        );
        res.status(200).json(userStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsersStatus = async (req, res) => {
    try {
        const usersStatus = await UserStatus.find();  // Correct model name
        res.status(200).json(usersStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { updateUserStatus, getAllUsersStatus };
