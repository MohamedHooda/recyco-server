const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pickupSchema = new Schema({
  item: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})
const appointmentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date_of_appointment: {
    type: Schema.Types.Date,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'DONE', 'CANCELED'],
    required: false,
    default: 'PENDING'
  },
  created_at: {
    type: Schema.Types.Date,
    required: true
  },
  pickup: [pickupSchema],
  points: {
    type: Number,
    required: true,
    default: 0
  }
})
module.exports = Appointment = mongoose.model('Appointment', appointmentSchema)
