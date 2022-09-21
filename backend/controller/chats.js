const asyncHandler = require('express-async-handler')

const get_chats = asyncHandler ( async (req, res) => {
    res.status(200).json({ message : `Get chats of ${req.params.id}`})
})

module.exports = {
    get_chats
}