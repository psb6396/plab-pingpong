const express = require('express')
const path = require('path')
const { Game, Gym, User, sequelize } = require('../models')
const Reservation = sequelize.models.Reservation
const { isLoggedIn, isManager } = require('./middlewares')
const router = express.Router()

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
      // const sameReservation = await Reservation.findAll(
      //    {
      //       where: { UserId: req.user.id, GameId: game.id },
      //    },
      //    { transaction }
      // )
      // if (sameReservation.length !== 0) {
      //    throw new Error('선택된 게임에 이미 참가 된 상태입니다.')
      // }

      // 같은 시간대의 게임에 참가 된 상태인지 확인(해당게임까지 처리가능)
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
      await Reservation.create(
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

      res.status(201).json({
         success: true,
         message: '참가처리가 성공적으로 되었습니다',
      })
      await transaction.commit()
   } catch (error) {
      await transaction.rollback()
      console.error(error)
      res.status(500).json({ success: false, message: '게임 참가요청 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
