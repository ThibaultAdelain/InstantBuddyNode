const express = require('express')
const router = express.Router()
const {
    login,
    register,
    getMe,
    logout
} = require('../controller/userController')
const {
    get_chats
} = require('../controller/chats')
const {
    get_map
} = require('../controller/map')

const { protect } = require('../middleware/authMiddleware')

const {
    get_profile,
    update_profile
} = require('../controller/profile')

router.route('/register').post(register)
router.route('/login').post(login)
router.get('/logout', protect, logout)
router.get('/me', protect, getMe)
router.get('/chats', protect, get_chats)
router.get('/map', protect, get_map)


module.exports = router