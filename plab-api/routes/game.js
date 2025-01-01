const express = require('express')
const path = require('path')
const { Game, Gym, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

//게임 등록 localhost:8000/game
router.post('/', isLoggedIn, async (req, res) => {
  const {
    selectedGymId,
    selectedDate,
    selectedTime,
    maximumPeople,
    minimumPeople,
  } = req.body
  //   console.log(req.body)
  try {
    console.log('asdf')
  } catch (error) {}
})

module.exports = router
