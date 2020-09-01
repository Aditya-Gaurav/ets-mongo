const passport = require('passport');


const setup = () => {
    passport.serializeUser((user, done) => done(null, user._id))

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id)
            return done(null, user)
        } catch (err) {
            return done(err, null)
        }
    })
}

module.exports = setup; 
