const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  iconUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Social', socialSchema);
