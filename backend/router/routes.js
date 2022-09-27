const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const {
    get_chats
} = require('../controller/chats')
const {
    get_map
} = require('../controller/map')


router.get('/', (req, res) => {
    if (req.signedCookies.name) {
        res.status(200).json({ message: `Hello ${req.signedCookies.name}` })
    } else {
        res.status(200).json({ message: 'Hello from index' })
    }
})

router.get('/login', (req, res) => {
    res.status(200).json({ message: "hello from login"})
})

router.route('/chats/:id').get(get_chats)

router.route('/map/:id').get(get_map)

module.exports = router