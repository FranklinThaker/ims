const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
//const User = require('../models').User;
const db = require('../models/index.js');
const users = db.Users;

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'nodeauthsecret',
  };
  passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    users
      .findByPk(jwt_payload.id)
      .then((user) => { return done(null, user); })
      .catch((error) => { return done(error, false); });
  }));
};