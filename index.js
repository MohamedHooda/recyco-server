const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')

//Creating app
app.use(express.json())
app.use(cors())

dotenv.config()
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${
      process.env.MONGO_ATLAS_PASSWORD
    }@cluster0-la7i4.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const users = require('./api/routes/user.router')
const appointments = require('./api/routes/appointment.router')
const factories = require('./api/routes/factory.router')
const items = require('./api/routes/item.router')
const challenges = require('./api/routes/challenge.router')

app.use('/api/users', users)
app.use('/api/appointments', appointments)
app.use('/api/factories', factories)
app.use('/api/items', items)
app.use('/api/challenges', challenges)

app.use((req, res) => {
  res.status(404).send({ err: 'Mafeesh el kalam da' })
})
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server on ${port}`))
