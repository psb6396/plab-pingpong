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
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // Handle user profile here (e.g., save to database)
        console.log('google profile : ', profile)
        console.log('엑세스토큰:', accessToken)
        try {
          const exSocialAccount = await SocialAccount.findOne({
            // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
            where: { snsId: profile.id, accountType: 'GOOGLE' },
          })
          // SocialAccount객체에서 find해서
          // 이미 가입된 구글 프로필이면 성공
          if (exSocialAccount) {
            const exUser = await User.findOne({
              where: { id: exSocialAccount.userId },
            })
            done(null, exUser) // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 SocialAccount와 User를 각각 create 하고 로그인을 시킨다
            const tempSocialAccount = {
              snsId: profile.id,
              accountEmail: profile?.emails[0].value,
              accountType: 'GOOGLE',
            }
            const tempUser = {
              email: profile?.emails[0].value,
            }

            done(null, false, {
              message: '가입되지 않은 회원입니다.',
              tempThings: { tempSocialAccount, tempUser },
            }) // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error)
          done(error)
        }
      }
    )
  )
}
