const GoogleStrategy = require('passport-google-oauth20').Strategy
const { sequelize } = require('../config/db')
const { User } = require('../models/userModel')
const { generateUUID } = require('../middleware/authMiddleware')
const bcrypt = require('bcryptjs')
const colors = require('colors')


module.exports = function(passport) {
    passport.use(new GoogleStrategy ({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback',
        userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
    },
    async (accessToken, refreshToken, profile, done) => {

        console.log(profile)

        const sessionID = generateUUID()
        const password = generateUUID()
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        try {
            const newUser = {
                name: profile._json.name,
                email: profile._json.email,
                password: hashedPassword,
                sessionID: sessionID
            }
            let user = await User.findOne({
                where: {
                    email: profile._json.email
                }
            })
            if (user) {
                user.sessionID = sessionID
                user.save()
                return done(null, user)
            } else {
                user = await User.create(newUser)
                return done(null, user)
            }
        } catch (err) {
            console.log(colors.red(err))
        }
 

    }))
}