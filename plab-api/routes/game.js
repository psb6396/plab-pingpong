const express = require('express')
const path = require('path')
const { Game, Gym, User, sequelize } = require('../models')
const Reservation = sequelize.models.Reservation
const { isLoggedIn, isManager } = require('./middlewares')
const { getMaxListeners } = require('events')
const { where } = require('sequelize')
const router = express.Router()

//게임 등록 localhost:8000/game
router.post('/', isManager, async (req, res) => {
   try {
      const gymId = req.body.gymId
      const originalDateObject = new Date(req.body.date) // Parse the date string into a Date object
      originalDateObject.setHours(req.body.time) // Set the hour value dynamically
      const datetime = originalDateObject
      //입력받은 조건들로 같은 시간대에 매니저본인의 매칭예약이 존재하는지 확인, (체육관 겹치는지는 확인 안됨.)
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
         maximumPeople: req.body.maxPeople,
         minimumPeople: req.body.minPeople,
         managerId: req.user.id,
         gymId: gymId,
         currentPeople: 0,
      })
      //성공 응답 반환
      res.status(201).json({
         success: true,
         message: '매칭예약이 성공적으로 등록되었습니다.',
         game: newGame,
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

//게임 수정 localhost:8000/game/:id
router.put('/:id', isManager, async (req, res) => {
   try {
      const originalGame = await Game.findOne({
         where: { id: req.params.id, managerId: req.user.id },
      })
      if (!originalGame) {
         return res.status(404).json({ success: false, message: '게임을 찾을 수 없습니다.' })
      }
      // const gymId = req.body.gymId
      const DateObject = new Date(req.body.date) // Parse the date string into a Date object
      DateObject.setHours(req.body.time) // Set the hour value dynamically
      const datetime = DateObject
      // 게임 수정
      // 먼저 매니저본인과 수정된 시간대를 포함하는 게임을 찾아야함 중복찾기 ㅇㅇ
      const sameTimeGame = await Game.findAll({
         where: { managerId: req.user.id, datetime: datetime },
      })

      if (sameTimeGame.length !== 0) {
         return res.status(404).json({
            success: false,
            message: '동일한 시간대에 생성된 게임이 있습니다.',
         })
      }
      await originalGame.update({
         gymId: req.body.gymId,
         datetime: datetime,
         maximumPeople: req.body.maxPeople,
         minimumPeople: req.body.minPeople,
      })

      //업데이트 된 게임 다시 조회
      const updatedGame = await Game.findOne({
         where: { id: req.params.id },
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
         game: updatedGame,
         message: '게임이 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게임 수정 중 오류가 발생했습니다.',
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
      res.status(500).json({
         success: false,
         message: '게임 리스트를 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

//특정 게임 불러오기(id로 게임 조회)
router.get('/:id', isLoggedIn, async (req, res) => {
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

      const jsgamedate = new Date(game.datetime)

      res.json({
         success: true,
         game,
         jsgamedate,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게임을 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

//게임삭제 localhost:8000/game/:id
router.delete('/:id', isManager, async (req, res) => {
   try {
      //삭제할 게임 존재 여부 확인
      const game = await Game.findOne({
         where: { id: req.params.id, managerId: req.user.id },
      })
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
      res.status(500).json({
         success: false,
         message: '게임 삭제 중 오류가 발생했습니다.',
         error,
      })
   }
})

//게임에 참가 신청하기
router.post('/:id', isLoggedIn, async (req, res) => {
   const transaction = await sequelize.transaction()
   try {
      //params id로 신청할 게임찾기(o) -> 최대인원수 다 찼는지 확인(o) -> 본인이 이미 참가된 게임인지 확인하기(o) -> 본인이 예약한 매치중에 중복된 시간은 없는지 확인(o) -> 신청자 본인 id와 게임id로 reservation 에 추가 -> 해당 게임 인원수 1 올리기
      const game = await Game.findOne(
         {
            where: { id: req.params.id },
            include: [
               {
                  model: Gym,
                  attributes: ['name', 'address'],
               },
            ],
         },
         { transaction }
      )
      if (!game) {
         throw new Error('게임을 찾을 수 없습니다.')
      }
      if (game.currentPeople === game.maximumPeople) {
         throw new Error('게임 인원이 다 찼습니다. 신청이 불가능합니다.')
      }

      // 신청하려는 게임에 이미 참가 된 상태인지 확인
      const sameReservation = await Reservation.findAll(
         {
            where: { UserId: req.user.id, GameId: game.id },
         },
         { transaction }
      )
      if (sameReservation.length !== 0) {
         throw new Error('선택된 게임에 이미 참가 된 상태입니다.')
      }

      // 같은 시간대의 게임에 참가 된 상태인지 확인
      const sameTimeReservation = await Reservation.findAll(
         {
            where: { UserId: req.user.id },
            include: {
               model: Game,
               where: { datetime: game.datetime },
            },
         },
         { transaction }
      )
      if (sameTimeReservation.length !== 0) {
         throw new Error('같은 시간대에 참가처리된 게임이 있습니다.')
      }

      // 매칭에 참가
      const reservation = await Reservation.create(
         {
            UserId: req.user.id,
            GameId: game.id,
         },
         { transaction }
      )

      //현재 인원수 증가
      game.currentPeople = game.currentPeople + 1

      //테이블 update
      await game.save({ transaction })
   } catch (error) {
      await transaction.rollback()
      console.error(error)
      res.status(500).json({ success: false, message: '게임 참가요청 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
