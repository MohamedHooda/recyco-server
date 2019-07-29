const express = require('express')
const { verifyToken } = require('../middleware/auth')

// init router
const router = express.Router()

// import controller
const appointment_controller = require('../controllers/appointment.controller')

router.post('/create', verifyToken, appointment_controller.create)
router.post('/update', verifyToken, appointment_controller.update)
router.post('/viewAll', verifyToken, appointment_controller.view_all_admin)
router.post(
  '/viewMyAppointments',
  verifyToken,
  appointment_controller.view_my_appointments
)
router.post(
  '/appointmentDone',
  verifyToken,
  appointment_controller.appointment_done
)
router.post(
  '/appointmentCancel',
  verifyToken,
  appointment_controller.appointment_cancel
)

module.exports = router
