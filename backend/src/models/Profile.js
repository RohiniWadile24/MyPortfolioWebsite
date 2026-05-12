const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  avatarUrl: { type: String },
  resumeUrl: { type: String },
  email: { type: String, required: true },
  location: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
