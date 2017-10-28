var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Employer = require('../controllers/EmployerController');

//passport middleware
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//passport local strategy
passport.use( 'employer', new LocalStrategy({usernameField: 'email',
    passwordField: 'password',
    session: false
  },
	function(username, password, done){
		
		Employer.find({email:username}, function(err, employers){
			if(err) {
				return done(err, null, null);
			}
			
			var employer = employers[0];
			if(!employer){
				return done(null, false, { 'confirmation':'fail', message: 'Unknown Employer'});
			}

			Employer.comparePassword(password, employer.password, function(err, isMatch){
				if(err) {
					return done(err, null, null);
				}
				else if(isMatch){
					return done(null, Employer, {'confirmation':'success', 'result':employer});
				}else{
					return done(null, false, {'confirmation':'fail', message: 'Invalid Password'});
				}
			});
		});
	}
));

module.exports = passport;