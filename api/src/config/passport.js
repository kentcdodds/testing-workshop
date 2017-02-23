import passport from 'passport'
import local from 'passport-local'
import mongoose from 'mongoose'

export default setupPassport

function setupPassport() {
  const User = mongoose.model('User')
  passport.use(
    new local.Strategy(
      {
        usernameField: 'user[email]',
        passwordField: 'user[password]',
      },
      (email, password, done) => {
        User.findOne({email})
          .then(user => {
            if (!user || !user.validPassword(password)) {
              return done(null, false, {
                errors: {'email or password': 'is invalid'},
              })
            }

            return done(null, user)
          })
          .catch(done)
      },
    ),
  )
}
