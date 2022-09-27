// Register
// Login
// getMe

const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const colors = require('colors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()
const { User } = require('../models/userModel')
const { generateUUID, protect } = require('../middleware/authMiddleware')
const { sequelize } = require('../config/db')
const { col } = require('sequelize')



// Register a new user
// @route /user/register
// @access Public

const register = asyncHandler ( async  (req, res) => {

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
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error ('Invalid user data')
    }
})

// login an user
// @route user/login

const login = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    const user = await User.findOne({
        where: {
            email: email
        }
    })

    // secure: true    means only https request is sent. During dev, your localhost will not read cookies sent
    // HTTPonly: true   means the cookie is not accessible using the Js code in the browser (avoid cross-scripting attack)
    // sameSite: 'lax'   means the cookie is only accessible through your website
    if (user && (await bcrypt.compare(password, user.password))) {
        let flag = true
        if (process.env.NODE_ENV === 'development') {
            flag = false
        }
        res.cookie("name", user.name, {
            secure: flag,
            httpOnly: true,
            sameSite: 'lax',
            signed: true
        })

        // Set the attribute sessionID in the db
        const sessionID = generateUUID()
        user.sessionID = sessionID
        user.save()

        // Set the cookies name and sessionID
        res.cookie("sessionID", sessionID, {
            secure: flag,
            httpOnly: true,
            sameSite: 'lax',
            signed: true
        })
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
        throw new Error ('Invalid credentials')
    }

})

// Get user data
// @route user/me
// @access Private

const getMe = asyncHandler( async (req, res) => {
    res.status(200).json({
        _id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

const logout = asyncHandler( async (req, res) => {
    const user = await User.findOne({
        where: {
            sessionID: req.signedCookies.sessionID
        }
    })
    user.sessionID = null
    user.save()
    res.clearCookie("name")
    res.clearCookie("sessionID")
    return res.redirect("/login")
})

module.exports = {
    register,
    login,
    getMe,
    logout
}