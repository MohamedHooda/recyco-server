const express = require('express')
const { verifyToken } = require('../middleware/auth')

// init router
const router = express.Router()

// import controller
const item_controller = require('../controllers/item.controller')

router.post('/create', verifyToken, item_controller.create)
router.post('/update', verifyToken, item_controller.update)
router.post('/viewAll', verifyToken, item_controller.view_all_admin)

module.exports = router
