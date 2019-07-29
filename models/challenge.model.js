const mongoose = require('mongoose')
const Schema = mongoose.Schema
const challengeSchema = new Schema({
  unique_name: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  deadline: {
    type: Schema.Types.Date,
    required: true
  },
  created_at: {
    type: Schema.Types.Date,
    required: true
  },
  number_of_orders: {
    type: Number,
    required: false,
    default: 0
  },
  points_per_order: {
    type: Number,
    required: false,
    default: 0
  },
  status: { type: String, required: true, default: 'PENDING' }
})
module.exports = Challenge = mongoose.model('Challenge', challengeSchema)
