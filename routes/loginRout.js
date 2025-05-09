const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models/userM.js')

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // 2. Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    // 3. If using JWT (optional): generate and send token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // For now: return success + basic user info
    res.json({
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
    });
});

module.exports = router;
