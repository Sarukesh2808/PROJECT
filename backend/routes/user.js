const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/', async (req, res) => {
    // console.log('Request body:', req.body); // Log the incoming request body
    const { username, email, imageUrl } = req.body;
    const user = new User({ username, email, imageUrl });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error); // Log the error for better understanding
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});


// Login a user
router.post('/login', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update loggedIn to true
        user.loggedIn = true;
        await user.save();

        // If user is found, return user ID and status
        res.json({ id: user._id, loggedIn: user.loggedIn, username:user.username });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});
router.post('/:id/logout', async (req, res) => {
    const userId = req.params.id; // Extract user ID from the URL
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update the loggedIn status to false
        user.loggedIn = false;
        await user.save(); // Save the updated user

        res.status(200).json({ message: 'User logged out successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out user', error: error.message });
    }
});
// Get user profile
// Get the profile of the logged-in user
router.get('/', async (req, res) => {
    try {
        // Find the user who is logged in
        const user = await User.findOne({ loggedIn: true });

        if (!user) return res.status(404).json({ message: 'No user currently logged in' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

module.exports = router;
