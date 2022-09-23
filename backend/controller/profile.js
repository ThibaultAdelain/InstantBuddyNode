const asyncHandler = require('express-async-handler')

const get_profile = asyncHandler ( async (req, res) => {
    res.status(200).json({ message : `Get profile ${req.params.id}`})
})

const update_profile = asyncHandler ( async (req, res) => {
    console.log(req.body)
    res.status(200).json({ message : `Update profile ${req.params.id}` })
})

module.exports = {
    get_profile,
    update_profile
}
