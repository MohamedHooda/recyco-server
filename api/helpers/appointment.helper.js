const User = require('../../models/user.model')
const Appointment = require('../../models/appointment.model')
const Item = require('../../models/item.model')
const calculate_points = async req => {
  const appointment_id = req.body.id
  const appointment = await Appointment.findById(appointment_id)
  const user_id = appointment.user_id
  const user = await User.findById(user_id)
  var total_points = 0
  for (var i = 0; i < appointment.pickup.length; i++) {
    const item = await Item.find({
      name: appointment.pickup[i].item,
      unit: appointment.pickup[i].unit
    })
    if (!item) break
    total_points += item[0].points * appointment.pickup[i].amount
  }
  console.log(total_points)
  console.log(user)
  await User.findByIdAndUpdate(user_id, { points: user.points + total_points })
  const ay7aga = await Appointment.findByIdAndUpdate(appointment_id, {
    points: total_points
  })
  console.log(ay7aga)
}
const calculator = async appointment => {
  var total_points = 0
  for (var i = 0; i < appointment.pickup.length; i++) {
    const item = await Item.find({ name: appointment.pickup[i].item })
    if (!item) break
    total_points += item[0].points * appointment.pickup[i].amount
  }
  return total_points
}
module.exports = { calculate_points, calculator }
