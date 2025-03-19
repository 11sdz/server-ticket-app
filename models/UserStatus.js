const mongoose = require("mongoose");

const UserStatusSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

// Register the model only if it doesn't already exist
module.exports = mongoose.models.UserStatus || mongoose.model("UserStatus", UserStatusSchema);
