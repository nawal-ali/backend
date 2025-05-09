const express = require('express');
const router = express.Router();
const { User, validateCreateUser } = require('../models/userM.js')
// const bcrypt = require('bcryptjs')

// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(req.body.password, salt);

router.get('/allusers', async (req, res) => {
    try {
        const allUsers = await User.find()
        res.json({ action: 'success', count: allUsers.length, data: allUsers })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    const { error } = validateCreateUser(req.body)
    if (error) {
        res.json({ message: error.details[0].message })
    }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.json({ message: 'this email is already used' })
    }
    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
module.exports = router;
