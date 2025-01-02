const express = require('express')
const path = require('path')
const { Game, Gym, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

//게임 등록 localhost:8000/game
router.post('/', isLoggedIn, async (req, res) => {
   try {
      // console.log(req.body)
      const game = await Game.create({})
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게임매치 등록 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
