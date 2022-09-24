const express = require('express')
const router = express.Router()
const {
    login,
    register,
    getMe,
    logout
} = require('../controller/userController')

const {
    get_profile,
    update_profile
} = require('../controller/profile')

router.route('/register').post(register)
router.route('/login').post(login)
router.get('/logout', logout)
router.get('/me', getMe)
//router.route('/:id').get(get_profile).put(update_profile)

module.exports = router