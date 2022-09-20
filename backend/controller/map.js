const get_map = (req, res) => {
    res.status(200).json({ message : `Get map of ${req.params.id}`})
}

module.exports = {
    get_map
}