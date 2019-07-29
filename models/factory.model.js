const mongoose = require('mongoose')
const Schema = mongoose.Schema
const factorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})
module.exports = Factory = mongoose.model('Factory', factorySchema)
