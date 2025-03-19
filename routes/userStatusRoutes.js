const express = require('express');
const { updateUserStatus, getAllUsersStatus } = require('../controllers/userStatusController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to update user status
router.post('/update', protect, updateUserStatus);

// Route to get all users' status
router.get('/', getAllUsersStatus);

module.exports = router;

