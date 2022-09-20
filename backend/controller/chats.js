const get_chats = (req, res) => {
    res.status(200).json({ message : `Get chats of ${req.params.id}`})
}

module.exports = {
    get_chats
}