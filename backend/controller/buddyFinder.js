const asyncHandler = require('express-async-handler')
const colors = require('colors')
const { User } = require('../models/userModel')
const { sequelize } = require('../config/db')
const { json } = require('body-parser')

// Post Location
// @route /user/location
// @access Private

const postLocation = asyncHandler( async (req, res) => {
    
    try {
    const { longitude, latitude } = req.body

    const user = await User.findOne({
        where: {
            email: req.signedCookies.email
        }
    })

    user.longitude = longitude
    user.latitude = latitude
    user.save()


        console.log(colors.bgMagenta('Location data successfully saved'))

        res.status(200).json({
            name: user.name,
            email: user.email,
            longitude: longitude,
            latitude: latitude
        })

    } catch {
        throw new Error("Instant Buddy can't access your location")
    }

})

// Find a Buddy
// @route /user/BuddyFinder
// @access Private

const buddyFinder = asyncHandler( async (req, res) => {

    const user = await User.findOne({
        where: {
            email: req.signedCookies.email
        }
    })
    
    try {
        const buddies = await sequelize.query("(SELECT email, updatedAt FROM users WHERE (longitude BETWEEN ? AND ?) AND (latitude BETWEEN ? AND ?) AND email != ?)", {
            replacements: [user.longitude - 0.005, user.longitude + 0.005, user.latitude - 0.005, user.latitude + 0.005, user.email]
        })

        res.status(200).json({
            buddies : buddies
        }) 
    } catch (error) {
        throw new Error("Server can't find a buddy")
    }
})

module.exports = {
    postLocation,
    buddyFinder
}