const { json } = require('body-parser')
const asyncHandler = require('express-async-handler')

const { User } = require('../models/userModel')

const get_register = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'Get register' })
})

const post_register = asyncHandler ( async  (req, res) => {
    if (!req.body.username) {
        res.status(400)
        throw new Error('Please add an username')
    }
    if (!req.body.password) {
        res.status(400)
        throw new Error('Please add a password')
    } 

    res.status(200).json({ message: 'Post register'})
})

module.exports = {
    get_register,
    post_register
}