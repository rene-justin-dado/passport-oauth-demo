const cookieParser = require('cookie-parser')
const express = require('express')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const auth = require('./lib/auth')
const users = require('./lib/users')
const apiRoutes = require('./routes/api')

process.on('unhandledRejection', (error, promise) => {
  console.error('UNHANDLED REJECTION', error.stack)
})

const app = express()

// A real server would never store the JWT signing secret here!
app.set('JWT_SECRET', 'SECRET! SO, SO, SECRET!')

app.use(cookieParser())
app.use(passport.initialize())
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
  res.send(`Token is: ${req.cookies.token}`)
})

passport.use(new TwitterStrategy(auth.twitterConfig, auth.verify))
passport.serializeUser(users.serialize)
passport.deserializeUser(users.deserialize)

app.listen(3000, () => {
  console.log('Listening on 3000')
})
