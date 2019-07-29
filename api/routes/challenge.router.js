const express = require('express')
const { verifyToken } = require('../middleware/auth')

// init router
const router = express.Router()

// import controller
const challenge_controller = require('../controllers/challenge.contoller')

router.post('/create', verifyToken, challenge_controller.create)
router.post('/update', verifyToken, challenge_controller.update)
router.post('/viewAll', verifyToken, challenge_controller.view_all_admin)
router.post('/delete', verifyToken, challenge_controller._delete)
router.post('/claim', verifyToken, challenge_controller.claim)
router.post(
  '/viewMyChallenges',
  verifyToken,
  challenge_controller.view_my_challenges
)
module.exports = router
