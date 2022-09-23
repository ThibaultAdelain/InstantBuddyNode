const express = require('express')
const router = express.Router()
const {
    get_register,
    post_register
} = require('../controller/register')
const {
    get_profile,
    update_profile
} = require('../controller/profile')
const {
    get_chats
} = require('../controller/chats')
const {
    get_map
} = require('../controller/map')
const {
    get_login,
    post_login
} = require('../controller/login')


router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from index' })
})

router.route('/register').get(get_register).post(post_register)

router.route('/login').get(get_login).post(post_login)

router.route('/profile/:id').get(get_profile).put(update_profile)

router.route('/chats/:id').get(get_chats)

router.route('/map/:id').get(get_map)

module.exports = router