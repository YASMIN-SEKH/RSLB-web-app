const Preferences = require('../models/Preferences');
const User = require('../models/User');

// Save preferences
exports.savePreferences = async (req, res) => {
  try {
    const preferences = new Preferences(req.body);
    await preferences.save();
    
    // Link preferences to user
    const user = await User.findById(req.body.user);
    user.preferences = preferences._id;
    await user.save();

    res.status(201).json({ message: 'Preferences saved successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Match users based on preferences
exports.matchUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('preferences');
    const allUsers = await User.find().populate('preferences');

    const matchedUsers = allUsers.filter(otherUser => {
      if (otherUser._id.toString() !== user._id.toString()) {
        const pref = otherUser.preferences;
        return (
          pref.cleanliness === user.preferences.cleanliness &&
          pref.noiseTolerance === user.preferences.noiseTolerance &&
          pref.smoking === user.preferences.smoking &&
          pref.pets === user.preferences.pets &&
          pref.bedtime === user.preferences.bedtime
        );
      }
      return false;
    });

    res.json(matchedUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
