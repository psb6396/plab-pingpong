const express = require('express')
const path = require('path')
const { Game, Gym, User, sequelize } = require('../models')
const Reservation = sequelize.models.Reservation
const { isLoggedIn, isManager } = require('./middlewares')
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
      return res
        .status(404)
        .json({ success: false, message: '게임을 찾을 수 없습니다.' })
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
          as: 'Managers',
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
      order: [['createdAt', 'ASC']], // 옛날날짜 순으로 가져온다
      include: [
        {
          model: User,
          as: 'Managers',
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
      return res
        .status(404)
        .json({ success: false, message: '게임을 찾을 수 없습니다.' })
    }

    const jsgamedate = new Date(game.datetime)

    res.json({
      success: true,
      game,
      jsgamedate,
      message: '특정 게임을 성공적으로 불러왔습니다.',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: '특정 게임을 불러오는 중 오류가 발생했습니다.',
      error,
    })
  }
})

//모든 게임 불러오기
router.get('/', async (req, res) => {
  try {
    console.log('룰루랄라')
    const games = await Game.findAll({
      include: [
        {
          model: Gym,
          attributes: ['name', 'address'],
        },
      ],
      order: [['createdAt', 'DESC']], // 옛날날짜 순으로 가져온다
    })
    res.json({
      success: true,
      message: '모든 게임을 성공적으로 불러왔습니다.',
      games,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: '모든 게임을 불러오는 중 오류가 발생했습니다.',
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
      return res
        .status(404)
        .json({ success: false, message: '게임을 찾을 수 없습니다.' })
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

module.exports = router
