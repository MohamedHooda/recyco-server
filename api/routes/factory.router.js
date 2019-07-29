const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const joi = require('joi')
const Factory = require('../../models/factory.model')

// init router
const router = express.Router()

// import controller
const factory_controller = require('../controllers/factory.controller')

module.exports = router
