// Register
// Login
// getMe

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const hash = require('hash.js')
const asyncHandler = require('express-async-handler')
const { User } = require('../models/userModel')
const colors = require('colors')


// Register a new user

const post_register = asyncHandler ( async  (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists

    const userExists = await User.findOne({
        where: {email: email}
    })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    
    // Hash password
    // hashed using bcrypt, the algorithm is blowfish

    const salt = await bcrypt.genSalt(10)
    console.log(colors.bgBlue(salt))
    const hashedPassword = await hash.sha256().update(password + salt).digest('hex')
    console.log(colors.bgBlue(hashedPassword))

    // create user
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.email,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error ('Invalid user data')
    }
})

module.exports = {
    post_register
}