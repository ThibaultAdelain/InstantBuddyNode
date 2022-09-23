const express = require('express')
const router = express.Router()
const {
    get_chats
} = require('../controller/chats')
const {
    get_map
} = require('../controller/map')


router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from index' })
})

router.route('/chats/:id').get(get_chats)

router.route('/map/:id').get(get_map)

module.exports = router