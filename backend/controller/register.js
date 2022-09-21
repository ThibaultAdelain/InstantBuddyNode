const asyncHandler = require('express-async-handler')

const get_register = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'Get register' })
})

const post_register = asyncHandler ( async  (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a name')
    }
    if (!req.body.password) {
        res.status(400)
        throw new Error('Please add a password')
    }
    console.log(req.body)
    res.status(200).json({ message : 'Post register' })
})

module.exports = {
    get_register,
    post_register
}