const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point',
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
});

locationSchema.index({ coordinates: '2dsphere' });

// Export with model check
module.exports = mongoose.models.Location || mongoose.model('Location', locationSchema);
