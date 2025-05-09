const express = require('express');
const router = express.Router();
const { User, validateCreateUser } = require('../models/userM.js')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
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