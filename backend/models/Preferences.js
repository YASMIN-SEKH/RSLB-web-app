const mongoose = require('mongoose');

const PreferencesSchema = new mongoose.Schema({
  cleanliness: { type: String, enum: ['low', 'medium', 'high'], required: true },
  noiseTolerance: { type: String, enum: ['low', 'medium', 'high'], required: true },
  smoking: { type: Boolean, required: true },
  pets: { type: Boolean, required: true },
  bedtime: { type: String, enum: ['early', 'late', 'flexible'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Preferences', PreferencesSchema);
