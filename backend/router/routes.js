const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')

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

module.exports = router