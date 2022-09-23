const asyncHandler = require('express-async-handler')

const get_login = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'Get login' })
})

const post_login = asyncHandler ( async  (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a name')
    }
    if (!req.body.password) {
        res.status(400)
        throw new Error('Please add a password')
    }
    console.log(req.body)
    res.status(200).json({ message : 'Post login' })
})

module.exports = {
    get_login,
    post_login
}