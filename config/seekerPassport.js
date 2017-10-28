var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Seeker = require('../controllers/SeekerController');

//passport middleware
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//passport local strategy
passport.use( 'seeker', new LocalStrategy({usernameField: 'email',
    passwordField: 'password',
    session: false
  },
	function(username, password, done){
		
		Seeker.find({email:username}, function(err, seekers){
			if(err) {
				return done(err, null, null);
			}
			
			var seeker = seekers[0]
			if(!seeker){
				return done(null, false, { 'confirmation':'fail', 'message': 'Unknown Seeker'});
			}

			Seeker.comparePassword(password, seeker.password, function(err, isMatch){
				if(err) {
					return done(err, null, null);
				}
				else if(isMatch){
					return done(null, Seeker, { 'confirmation':'success','result':seeker});
				}else{
					return done(null, false, {  'confirmation':'fail', message: 'Invalid Password'});
				}
			});
		});
	}
));

module.exports = passport;