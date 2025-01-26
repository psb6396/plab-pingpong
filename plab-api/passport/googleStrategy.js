const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const SocialAccount = require('../models/socialAccount')

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // Handle user profile here (e.g., save to database)
      try {
        console.log('google profile : ', profile)
        // const exUser = await SocialAccount.findOne({
        //   where: {},
        // })
      } catch (error) {
        console.error(error)
        done(error)
      }
    }
  )
)
