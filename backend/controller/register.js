const get_register = (req, res) => {
    res.status(200).json({ message: 'Get register' })
}

const post_register = (req, res) => {
    res.status(200).json({ message : 'Post register' })
}

module.exports = {
    get_register,
    post_register
}