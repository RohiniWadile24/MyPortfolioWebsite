const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'], default: 'Other' },
  iconUrl: { type: String },
  proficiency: { type: Number, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
