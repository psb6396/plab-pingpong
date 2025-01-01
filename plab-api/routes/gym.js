const express = require('express')
const { Game, Gym, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const gyms = await Gym.findAll()
    res.json({
      success: true,
      gyms,
      message: '전체 체육관 리스트를 성공적으로 불러왔습니다.',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: '체육관 리스트를 불러오는 중 오류가 발생했습니다.',
      error,
    })
  }
})

module.exports = router
