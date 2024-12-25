const express = require('express') //express 프레임워크 가져오기

const path = require('path') // 경로 처리 유틸리티
const cookieParser = require('cookie-parser') // 쿠키 처리 미들웨어
const morgan = require('morgan') // HTTP 요청 로깅 미들웨어
const session = require('express-session') // 세션 관리 미들웨어
require('dotenv').config() // 환경 변수 관리
const cors = require('cors') // cors 미들웨어 -> api 서버는 반드시 설정해줘야 한다.
const {sequelize} = require('./models/index')

const app = express()

app.set('port', process.env.PORT || 8000)

//시퀄라이즈를 사용한 DB연결
sequelize
   .sync({ force: false })  // true 누르면 싹다 초기화
   .then(() => {
      console.log('데이터베이스 연결 성공 ')
   })
   .catch((err) => {
      console.error(err)
   })

// http://localhost:8000/ 으로 접속시 보여줄 내용
app.get('/', (req, res) => {
   res.send('Hello, Express!')
})

// 8000번 포트로 서버 시작
app.listen(PORT, () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${PORT}`)
})

