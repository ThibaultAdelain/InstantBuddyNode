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

        // Set the attribute sessionID 
        const sessionID = generateUUID()

        // Set the cookies name, email and sessionID
        res.cookie("name", user.name, {
            expires: new Date(Date.now() + 900000),
            secure: flag,
            httpOnly: true,
            sameSite: 'lax',
            signed: true
        })
        res.cookie("email", user.email, {
            expires: new Date(Date.now() + 900000),
            secure: flag,
            httpOnly: true,
            sameSite: 'lax',
            signed: true
        })
        res.cookie("sessionID", sessionID, {
            expires: new Date(Date.now() + 900000),
            secure: flag,
            httpOnly: true,
            sameSite: 'lax',
            signed: true
        })

        // Set sessionID of the user in the db
        // We do not put salt because each sessionID are supposed to be different
        const salt = await bcrypt.genSalt(10)
        const hashedSessionID = await bcrypt.hash(sessionID, salt)
        user.sessionID = hashedSessionID
        user.save()
        
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
        email: req.user.email,
    })
})

const logout = asyncHandler( async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.signedCookies.email
        }
    })
    user.sessionID = null
    user.save()
    res.clearCookie("name")
    res.clearCookie("email")
    res.clearCookie("sessionID")
    return res.redirect("/login")
})

module.exports = {
    register,
    login,
    getMe,
    logout
}