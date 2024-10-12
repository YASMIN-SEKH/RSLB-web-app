// backend/routes/preferences.js
const express = require('express');
const router = express.Router();
const Preferences = require('../models/Preferences');

// POST request to save preferences
router.post('/', (req, res) => {
  const newPreferences = new Preferences(req.body);

  // Save preferences to MongoDB
  newPreferences.save()
    .then(() => res.status(200).send('Preferences saved successfully'))
    .catch(err => res.status(500).send('Error saving preferences: ' + err));
});

module.exports = router;
