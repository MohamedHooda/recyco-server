const Appointment = require('../../models/appointment.model')
const User = require('../../models/user.model')
const moment = require('moment')
const appointment_helper = require('../helpers/appointment.helper')

const create = async (req, res) => {
  const { date_of_appointment, pickup } = req.body
  const newAppointment = await new Appointment({
    user_id: req.data.id,
    date_of_appointment,
    created_at: moment().format(),
    pickup
  }).save()
  await User.findByIdAndUpdate(req.data.id, {
    $push: { appointments: newAppointment }
  }).exec()
  return res.send({ data: newAppointment })
}
const view_all_admin = async (req, res) => {
  const allAppointments = await Appointment.find()
  return res.json({ data: allAppointments })
}
const appointment_done = async (req, res) => {
  if (!req.data.user_type.includes('A')) {
    return res.status(403).send({ error: "Can't access this route" })
  }
  const { id } = req.body
  const appointment_validation = await Appointment.findById(id)
  if (appointment_validation.status === 'DONE') {
    return res.status(403).send({ error: 'Already Done' })
  }
  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status: 'DONE' },
    { new: true }
  )
  const user = await User.findById(appointment.user_id)
  const myAppointments = user.appointments
  var newAppointments = [appointment]
  myAppointments.forEach(appointment => {
    if (appointment._id.toString() !== id.toString()) {
      newAppointments.push(appointment)
    }
  })

  await User.findByIdAndUpdate(
    appointment.user_id,
    { appointments: newAppointments },
    { new: true }
  )

  await appointment_helper.calculate_points(req)
  return res.send({ data: appointment })
}
const appointment_cancel = async (req, res) => {
  const { id } = req.body
  const appointment_validation = await Appointment.findById(id)
  if (appointment_validation.status === 'DONE') {
    return res.status(403).send({ error: 'Already Done' })
  }
  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status: 'CANCELED' },
    { new: true }
  )
  const user = await User.findById(req.data.id)
  const myAppointments = user.appointments
  var newAppointments = [appointment]
  myAppointments.forEach(appointment => {
    if (appointment._id.toString() !== id.toString()) {
      newAppointments.push(appointment)
    }
  })

  await User.findByIdAndUpdate(
    req.data.id,
    { appointments: newAppointments },
    { new: true }
  )

  return res.send({ data: appointment })
}
const view_my_appointments = async (req, res) => {
  const user = await User.findById(req.data.id)
  const appointments = user.appointments
  return res.send({ data: appointments })
}
const update = async (req, res) => {
  const { id } = req.body
  // const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
  //   new: true
  // })

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (err, model) => {
      if (!err) {
        return res.json({ data: model })
      } else {
        return res.json({
          error: `Error, couldn't update an appointment given the following data`
        })
      }
    }
  )

  return res.send({ data: appointment })
}
module.exports = {
  create,
  view_all_admin,
  appointment_done,
  view_my_appointments,
  update,
  appointment_cancel
}
