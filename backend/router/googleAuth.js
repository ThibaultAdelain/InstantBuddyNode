const express = require('express')
const router = express.Router()
const passport = require('passport')
const colors = require('colors')

// @desc Auth with google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}))

// @desc Google auth callback
// @route GET auth/google/callback
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/Register',
    session: false
}), (req, res) => {
    let flag = true
    if (process.env.NODE_ENV === 'development') {
        flag = false
    }
    res.cookie("name", req.user.name, {
        expires: new Date(Date.now() + 900000),
        secure: flag,
        httpOnly: true,
        sameSite: 'lax',
        signed: true
    })
    res.cookie("email", req.user.email, {
        expires: new Date(Date.now() + 900000),
        secure: flag,
        httpOnly: true,
        sameSite: 'lax',
        signed: true
    })
    res.cookie("sessionID", req.user.sessionID, {
        expires: new Date(Date.now() + 900000),
        secure: flag,
        httpOnly: true,
        sameSite: 'lax',
        signed: true
    })
    console.log(colors.bgMagenta('User successfully login'))
    res.redirect('http://localhost:3000/')
})

module.exports = router