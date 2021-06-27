const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User')

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token']
    }
    return token;
}

// authorization - wherever we want to protect our resources (endpoints) (todo's endpoint)
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : 'ThatSkiPatroller'
}, (payload, done) => {
    User.findById({_id : payload.sub}, (err, user) => {
        if (err)
            return done(err, false);
        if (user)
            return done(null, user);
        else    
            return done(null, false)
    })
}))

// authenticated local strategy using username and password - login
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        if (err)
            return done(err);
        if(!user)
            return done(null,false);
        user.comparePassword(password, done)
    })
}))