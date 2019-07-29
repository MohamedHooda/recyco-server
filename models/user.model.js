const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Appointment = require('../models/appointment.model').schema
const Challenge = require('../models/challenge.model').schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true,
    default: 0
  },
  photo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  user_type: [
    {
      enum: ['N', 'DP', 'A'],
      type: String,
      required: true
    }
  ],
  appointments: [Appointment],
  challenges: [Challenge],
  status: {
    type: String,
    default: 'ACTIVE'
  }
})
module.exports = User = mongoose.model('User', userSchema)
