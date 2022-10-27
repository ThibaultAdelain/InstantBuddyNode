const express = require('express')
const router = express.Router()
const {
    login,
    register,
    getMe,
    logout,
} = require('../controller/userController')
const {
    get_chats
} = require('../controller/chats')
const {
    get_map
} = require('../controller/map')
const {
    postLocation,
    buddyFinder
} = require('../controller/buddyFinder')

const { protect } = require('../middleware/authMiddleware')

router.route('/register').post(register)
router.route('/login').post(login)
router.get('/logout', protect, logout)
router.get('/me', protect, getMe)
router.get('/chats', protect, get_chats)
router.get('/map', protect, get_map)
router.get('/buddyFinder', protect, buddyFinder)
router.post('/location', protect, postLocation)



module.exports = router