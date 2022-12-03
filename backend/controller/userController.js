// Register
// Login
// getMe

const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const colors = require('colors')
const { User } = require('../models/userModel')
const { generateUUID } = require('../middleware/authMiddleware')
const { json } = require('body-parser')



// Register a new user
// @route /user/register
// @access Public

const register = asyncHandler ( async  (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    var filterEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

    if (!filterEmail.test(email)) {
        res.status(400)
        throw new Error('Email incorrect')
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

        let flag = true
        if (process.env.NODE_ENV === 'development') {
            flag = false
        }

        const sessionID = generateUUID()

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

        const salt = await bcrypt.genSalt(10)
        const hashedSessionID = await bcrypt.hash(sessionID, salt)
        user.sessionID = hashedSessionID
        user.save()

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            sessionID: sessionID
        })

        console.log(colors.bgMagenta('User successfully registered and logged in'))
        res.status(200, "User successfully registered and logged in")

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
            sessionID: sessionID
        })

        console.log(colors.bgMagenta('User successfully logged in'))
        res.status(200, "User successfully logged in")

    } else {
        res.status(401)
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
        sessionID: req.signedCookies.sessionID
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
    console.log(colors.bgMagenta('User successfully logged out'))
    res.status(200, "User successfully logged out")
    return res.redirect("/login")
})

const updateProfile = asyncHandler( async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.signedCookies.email
        }
    })
    const { name, email, description } = req.body
    if (!name || !email || !description) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    user.name = name
    user.email = email
    user.description = description
    user.save()
    res.clearCookie("name")
    res.clearCookie("email")
    let flag = true
    if (process.env.NODE_ENV === 'development') {
        flag = false
    }
    res.cookie("name", name, {
        expires: new Date(Date.now() + 900000),
        secure: flag,
        httpOnly: true,
        sameSite: 'lax',
        signed: true
    })
    res.cookie("email", email, {
        expires: new Date(Date.now() + 900000),
        secure: flag,
        httpOnly: true,
        sameSite: 'lax',
        signed: true
    })
    console.log(colors.bgMagenta('Profile successfully updated'))
    res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
    })
})

module.exports = {
    register,
    login,
    getMe,
    logout,
    updateProfile
}