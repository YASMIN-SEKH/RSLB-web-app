const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User({ name, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get all users with matching preferences
router.get('/search', async (req, res) => {
    try {
        const { genderPreference, smoking, pets, ageRange, budget, location } = req.query;

        const filters = {};
        if (genderPreference) filters['preferences.genderPreference'] = genderPreference;
        if (smoking) filters['preferences.smoking'] = smoking;
        if (pets) filters['preferences.pets'] = pets;
        if (ageRange) filters['preferences.ageRange'] = ageRange;
        if (budget) filters['preferences.budget'] = { $lte: budget };
        if (location) filters['preferences.location'] = location;

        const users = await User.find(filters);
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
