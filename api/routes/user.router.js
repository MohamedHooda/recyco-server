const express = require('express')
const { verifyToken } = require('../middleware/auth')

// init router
const router = express.Router()

// import controller
const user_controller = require('../controllers/user.controller')

router.post('/viewAllUsers', verifyToken, user_controller.view_all_admin)
router.post('/leaderboard', user_controller.leaderboard)
router.post('/register', user_controller.register)
router.post('/login', user_controller.login)
router.post('/update', user_controller.update)
router.post('/dashboard', verifyToken, user_controller.view_specific)
router.post('/delete', user_controller._delete)

module.exports = router
