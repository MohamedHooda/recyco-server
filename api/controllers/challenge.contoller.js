const Challenge = require('../../models/challenge.model')
const User = require('../../models/user.model')
const challenge_helper = require('../helpers/challenge.helper.js')
const moment = require('moment')

const create = async (req, res) => {
  const {
    description,
    points,
    deadline,
    name,
    unique_name,
    number_of_orders,
    points_per_order
  } = req.body
  const newChallenge = await new Challenge({
    description,
    points,
    created_at: moment().format(),
    deadline,
    name,
    unique_name,
    number_of_orders,
    points_per_order
  }).save()

  await User.updateMany(
    { status: 'ACTIVE' },
    { $push: { challenges: newChallenge } }
  )

  return res.send({ data: newChallenge })
}

const update = async (req, res) => {
  Challenge.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true },
    (err, model) => {
      if (!err) {
        return res.json({ data: model })
      } else {
        return res.json({
          error: `Error, couldn't update a challenge given the following data`
        })
      }
    }
  )
}

const _delete = async (req, res) => {
  await Challenge.findByIdAndDelete(req.body.id)
  const allChallenges = await Challenge.find()
  return res.send({ data: allChallenges })
}
const view_all_admin = async (req, res) => {
  const allChallenges = await Challenge.find()
  return res.send({ data: allChallenges })
}
const view_my_challenges = async (req, res) => {
  const user = await User.findById(req.data.id)
  const allChallenges = user.challenges
  const myAppointments = user.appointments
  console.log(myAppointments)

  for (var i = 0; i < allChallenges.length; i++) {
    await challenge_helper.challenge_accepted(allChallenges[i], myAppointments)
  }
  const userafter = await User.findById(req.data.id)
  const allChallengesAfter = userafter.challenges
  return res.send({ data: allChallengesAfter })
}
const claim = async (req, res) => {
  const { id } = req.body
  const challenge = await Challenge.findById(id)
  const points = challenge.points
  const user = await User.findById(req.data.id)
  const myChallenges = user.challenges
  const newchal = await Challenge.findByIdAndUpdate(
    id,
    { status: 'C' },
    { new: true }
  )
  console.log(newchal)
  var newChallenges = [newchal]
  for (var i = 0; i < myChallenges.length; i++) {
    console.log(myChallenges[i]._id.toString() === id.toString())
    if (!(myChallenges[i]._id.toString() === id.toString())) {
      newChallenges.push(myChallenges[i])
    }
  }
  const myPoints = user.points

  const user1 = await User.findByIdAndUpdate(req.data.id, {
    points: myPoints + points,
    challenges: newChallenges
  })
  return res.send({ data: user1 })
}
module.exports = {
  create,
  update,
  _delete,
  view_all_admin,
  view_my_challenges,
  claim
}
