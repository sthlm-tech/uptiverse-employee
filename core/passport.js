var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET || 'React Starter Kit',
};
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    var id = jwt_payload.id;

    if (id) {
        done(null, id);
    } else {
        done(null, false);
    }
}));

module.exports = passport;
