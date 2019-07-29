const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String
  },
  points: {
    type: Number
  }
})
module.exports = Item = mongoose.model('Item', itemSchema)
