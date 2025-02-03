const express = require('express')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const User = require('../models/user')

//회원가입 localhost:8000/auth/join
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password, managerChecked } = req.body
  try {
    //이메일로 기존 사용자 검색
    const exUser = await User.findOne({ where: { email } })
    if (exUser) {
      //이미 사용자가 존재할 경우 409상태코드와 메세지를 json객체로 응답
      return res.status(409).json({
        success: false,
        message: '이미 존재하는 사용자입니다.',
      })
    }
    //이메일 중복 확인을 통과시 새로운 사용자 계정 생성
    const hash = await bcrypt.hash(password, 12) // 12: salt(해시 암호화를 진행시 추가되는 임의의 데이터로 10~12 정도의 값이 권장)
    let newUser
    //새로운 사용자 생성
    if (managerChecked === true) {
      newUser = await User.create({
        email: email,
        nick: nick,
        password: hash,
        role: 'MANAGER',
      })
    } else if (managerChecked === false) {
      newUser = await User.create({
        email: email,
        nick: nick,
        password: hash,
        role: 'PLAYER',
      })
    }
    //성공 응답 반환
    res.status(201).json({
      success: true,
      message: '사용자가 성공적으로 등록되었습니다.',
      user: {
        id: newUser.id,
        email: newUser.email,
        nick: newUser.nick,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: '회원가입중 오류가 발생했습니다.',
      error,
    })
  }
})

//로그인 localhost:8000/auth/login
router.post('/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      //로그인 인증 중 에러 발생시
      return res.status(500).json({
        success: false,
        message: '인증 중 오류 발생',
        error: authError,
      })
    }
    if (!user) {
      //비밀번호 불일치 또는 사용자가 없을 경우 info.message를 사용해서 메세지 전달
      return res.status(401).json({
        success: false,
        message: info.message || '로그인 실패',
      })
    }

    // 인증이 정상적으로 되고 사용자를 로그인 상태로 바꿈
    req.login(user, (loginError) => {
      if (loginError) {
        // 로그인 상태로 바꾸는 중 오류 발생시
        return res.status(500).json({
          success: false,
          message: '로그인 중 오류 발생',
          error: loginError,
        })
      }

      //로그인 성공시
      //status code를 주지 않으면 기본값은 200
      res.json({
        success: true,
        message: '로그인 성공',
        user: {
          id: user.id,
          nick: user.nick,
        },
      })
    })
  })(req, res, next)
})

//구글로그인 연동 시작버튼
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback', isNotLoggedIn, (req, res, next) => {
  passport.authenticate(
    'google',
    { failureRedirect: '/' },
    (authError, user, info) => {
      if (authError) {
        //로그인 인증 중 에러 발생시
        return res.status(500).json({
          success: false,
          message: '인증 중 오류 발생',
          error: authError,
        })
      }
      if (!user) {
        req.session.tempThings = info.tempThings
      }
    }
  )(req, res, next)
})

//로그아웃 localhost:8000/auth/logout
router.get('/logout', isLoggedIn, async (req, res, next) => {
  // 사용자를 로그아웃 상태로 바꿈
  req.logout((err) => {
    if (err) {
      //로그아웃 상태로 바꾸는중 에러가 났을 때
      console.log(err)
      return res.status(500).json({
        success: false,
        message: '로그아웃 중 오류가 발생했습니다.',
        error: err,
      })
    }
    //로그아웃 성공시 세션에 저장되어 있던 사용자 id를 삭제해주고 아래와 같은 결과를 response
    //status code를 주지 않으면 기본값은 200
    res.json({
      success: true,
      message: '로그아웃에 성공했습니다.',
    })
  })
})

//로그인 상태 확인 localhost:8000/auth/status
router.get('/status', async (req, res, next) => {
  if (req.isAuthenticated()) {
    //로그인이 된 상태
    // req.user는 passport의 역직렬화 설정에 의해 로그인되었을때 가져올 수 있다
    res.json({
      isAuthenticated: true,
      user: {
        id: req.user.id,
        nick: req.user.nick,
      },
    })
  } else {
    //로그인이 되지 않았을 때
    res.json({
      isAuthenticated: false,
    })
  }
})

module.exports = router
