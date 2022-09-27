const asyncHandler = require('express-async-handler')

const get_map = asyncHandler (async (req, res) => {
    res.status(200).json({ message : `Get map of ${req.user.name}`})
})

module.exports = {
    get_map
}