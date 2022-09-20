
const get_profile = (req, res) => {
    res.status(200).json({ message : `Get profile ${req.params.id}`})
}

const update_profile = (req, res) => {
    console.log(req.body)
    res.status(200).json({ message : `Update profile ${req.params.id}` })
}

module.exports = {
    get_profile,
    update_profile
}
