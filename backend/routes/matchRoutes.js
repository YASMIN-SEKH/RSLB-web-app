const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

// Save user preferences
router.post('/preferences', matchController.savePreferences);

// Get matched users based on preferences
router.get('/match/:id', matchController.matchUsers);

module.exports = router;
