const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenKey = require('../../config/keys/keys').secret
const store = require('store')
const cloudinary = require('cloudinary').v2
const Challenge = require('../../models/challenge.model')

cloudinary.config({
  cloud_name: 'mohamedhooda',
  api_key: 653285149318386,
  api_secret: 'UOuzryB3T1UpbNWMXV4DfNAfi9U'
})

const view_all_admin = async (req, res) => {
  const allUsers = await User.find()
  return res.json({ data: allUsers })
}
const view_specific = async (req, res) => {
  const user = await User.findById(req.data.id).exec()
  return res.json({ data: user })
}
const register = async (req, res) => {
  const {
    email,
    username,
    date_of_birth,
    name,
    gender,
    phone,
    address,
    password,
    photo
  } = req.body
  var profilepic = ''
  const useremail = await User.findOne({ email })
  const usernamef = await User.findOne({ username })
  if (useremail || usernamef) {
    if (useremail)
      return res.status(400).json({ error: 'Email already exists' })
    else return res.status(400).json({ error: 'Username already exists' })
  }
  const salt = bcrypt.genSaltSync(10)
  const hashed_pass = bcrypt.hashSync(password, salt)
  // await cloudinary.uploader.upload(photo, (error, result) => {
  //   if (error) {
  //     return res.status(500).json({ error: error })
  //   } else {
  //     profilepic = result.url
  //   }
  // })
  const newUser = new User({
    user_type: ['N'],
    username,
    name,
    email,
    photo,
    password: hashed_pass,
    date_of_birth,
    phone,
    address,
    gender,
    appointments: [],
    challenges: []
  })
  const user = newUser
    .save()
    .then(user => res.json({ data: user }))
    .catch(err => res.json({ error: err.message }))
  const challenges = await Challenge.find()
  await User.findByIdAndUpdate(
    user._id,
    { challenges },
    { new: true },
    (err, model) => {
      if (!err) {
        return res.json({ data: model })
      } else {
        return res.json({
          error: `Error, couldn't update a user given the following data`
        })
      }
    }
  )
}
const login = async (req, res) => {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      return res.status(401).send({ auth: false, message: 'Server error.' })
    }
    if (!user) {
      return res.status(401).send({ auth: false, message: 'No user found.' })
    }
    const loginPassword = req.body.password
    if (!loginPassword) {
      return res
        .status(401)
        .send({ auth: false, message: 'Please enter pass.' })
    }
    const userPassword = user.password
    const match = bcrypt.compareSync(loginPassword, userPassword)
    if (!match) return res.status(401).send({ auth: false, token: null })
    const payLoad = {
      id: user._id,
      user_type: user.user_type,
      email: user.email
    }
    var token = jwt.sign(payLoad, tokenKey, {
      expiresIn: 86700 // expires in 24 hours
    })
    store.set('token', token)
    res.status(200).send({ auth: true, token: token, id: user._id })
  })
}
const update = async (req, res) => {
  await User.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true },
    (err, model) => {
      if (!err) {
        return res.json({ data: model })
      } else {
        return res.json({
          error: `Error, couldn't update a user given the following data`
        })
      }
    }
  )
}
const leaderboard = async (req, res) => {
  const allUsers = await User.find()
  allUsers.sort((a, b) => a.points < b.points)
  allUsers.sort(function(a, b) {
    return b.points - a.points
  })
  return res.send({ data: allUsers })
}
const _delete = async (req, res) => {
  await User.findByIdAndDelete(req.body.id)
  const allUsers = await User.find()
  return res.send({ data: allUsers })
}

module.exports = {
  view_all_admin,
  register,
  login,
  update,
  view_specific,
  leaderboard,
  _delete
}
