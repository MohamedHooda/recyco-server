const moment = require('moment')
const User = require('../../models/user.model')
const appointment_helper = require('../helpers/appointment.helper')
const challenge_accepted = async (challenge, appointments) => {
  const now = moment().format()
  var counter = 0
  if (challenge.unique_name === 'orders') {
    for (var i = 0; i < appointments.length; i++) {
      if (appointments[i].status === 'DONE') {
        counter = counter + 1
      }
    }
    if (counter === challenge.number_of_orders) {
      const user = await User.findById(appointments[0].user_id)
      const challenges = user.challenges
      for (var i = 0; i < challenges.length; i++) {
        if (
          challenge._id.toString() === challenges[i]._id.toString() &&
          challenge.status !== 'C'
        ) {
          challenges[i].status = 'TBC'
        }
      }

      await User.findByIdAndUpdate(
        appointments[0].user_id,
        {
          challenges: challenges
        },
        { new: true }
      )
    }
  } else if (challenge.unique_name === 'points') {
    for (var i = 0; i < appointments.length; i++) {
      console.log(appointments[i].points)
      var points = await appointment_helper.calculator(appointments[i])
      if (
        appointments[i].status === 'DONE' &&
        points > challenge.points_per_order
      ) {
        counter = counter + 1
        break
      }
    }
    if (counter === 1) {
      const user = await User.findById(appointments[0].user_id)
      const challenges = user.challenges
      for (var i = 0; i < challenges.length; i++) {
        if (challenge._id.toString() === challenges[i]._id.toString()) {
          challenges[i].status = 'TBC'
        }
      }

      await User.findByIdAndUpdate(
        appointments[0].user_id,
        {
          challenges: challenges
        },
        { new: true }
      )
    }
  }
}
module.exports = { challenge_accepted }
