const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const SocialAccount = require('../models/socialAccount')

// Google OAuth Strategy
module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // Handle user profile here (e.g., save to database)
        console.log('google profile : ', profile)
        try {
          const exSocialAccount = await SocialAccount.findOne({
            // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
            where: { snsId: profile.id, accountType: 'GOOGLE' },
          })
          // user객체에서 find해서
          // 이미 가입된 구글 프로필이면 성공
          if (exUser) {
            done(null, exUser) // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await User.create({
              email: profile?.email[0].value,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'google',
            })
            done(null, newUser) // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error)
          done(error)
        }
      }
    )
  )
}
