const LocalStrategy = require('passport-local').Strategy
//passport require needed to use passport.js (sets up with username and password)
const mongoose = require('mongoose') //inits the mongoose DB connection
const User = require('../models/User')//imports the user model from the user.js from the models folder 

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => { //looks through your database making sure the inputed email is there
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` }) //if not found
      }
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' }) //if no password inputed
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) } //makes sure it's the right password
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, { msg: 'Invalid email or password.' }) //error code if not
      })
    })
  }))
  
//https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
//good explanation about serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id) //keeps you logged in?
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user)) //log out (clear the session data)
  })
}
