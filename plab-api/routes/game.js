const express = require('express')
const path = require('path')
const { Game, Gym, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

//게임 등록 localhost:8000/game
router.post('/', isLoggedIn, async (req, res) => {
   try {
      // console.log(req.body)

      const gymId = req.body.gymId
      const dateObject = new Date(req.body.date) // Parse the date string into a Date object
      dateObject.setHours(req.body.time) // Set the hour value dynamically
      const datetime = dateObject.toISOString().slice(0, 19).replace('T', ' ')

      //입력받은 조건들로 같은 시간대에 매니저본인의 매칭예약이 존재하는지 확인
      const exGame = await Game.findOne({
         where: { datetime: datetime, managerId: req.user.id }, //manager_id도 넣어줘야함.
      })
      if (exGame) {
         //이미 매칭예약이 존재할 경우 409상태코드와 메세지를 json객체로 응답
         return res.status(409).json({
            success: false,
            message: '같은 시간대에 생성자 본인의 예약이 존재합니다.',
         })
      }
      const newGame = await Game.create({
         datetime: datetime,
         maximum_people: req.body.maxPeople,
         minimum_people: req.body.minPeople,
         managerId: req.user.id,
         GymId: gymId,
      })
      //성공 응답 반환
      res.status(201).json({
         success: true,
         message: '매칭예약이 성공적으로 등록되었습니다.',
         game: {
            id: newGame.id,
            datetime: newGame.datetime,
            maximum_people: newGame.maximum_people,
            minimum_people: newGame.minimum_people,
            managerId: newGame.managerId,
            GymId: newGame.GymId,
         },
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게임매치 등록 중 오류가 발생했습니다.',
         error,
      })
   }
})

//매니저 본인이 생성한 게임 불러오기
router.get('/created', isLoggedIn, async (req, res) => {
   try {
      const games = await Game.findAll({
         where: { managerId: req.user.id },
         order: [['createdAt', 'ASC']], // 최신날짜 순으로 가져온다
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'email'],
            },
            {
               model: Gym,
               attributes: ['name', 'address'],
            },
         ],
      })

      res.json({
         success: true,
         games,
         message: '생성한 게임 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게임 리스트를 불러오는 중 오류가 발생했습니다.', error })
   }
})

//특정 게임 불러오기(id로 게임 조회)
router.get('/:id', async (req, res) => {
   try {
      const game = await Game.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: Gym,
               attributes: ['name', 'address'],
            },
         ],
      })
      if (!game) {
         return res.status(404).json({ success: false, message: '게임을 찾을 수 없습니다.' })
      }
      res.json({
         success: true,
         game,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게임을 불러오는 중 오류가 발생했습니다.', error })
   }
})

//게임삭제 localhost:8000/game/:id
router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      //삭제할 게임 존재 여부 확인
      const game = await Game.findOne({ where: { id: req.params.id, managerId: req.user.id } })
      if (!game) {
         return res.status(404).json({ success: false, message: '게임을 찾을 수 없습니다.' })
      }

      // 게임 삭제
      await game.destroy()

      res.json({
         success: true,
         message: '게임이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게임 삭제 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
