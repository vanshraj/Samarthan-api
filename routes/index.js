var express = require('express');
var router = express.Router();
var employerPassport = require('../config/employerPassport');
var seekerPassport = require('../config/seekerPassport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/employer/login', function(req, res, next){
	employerPassport.authenticate('employer', function(err, employer, info){
		if(err) {
			res.status(400).json({'confirmation':'fail', 'message':err})		
		}
		else if(!employer){
			res.status(400).json(info)
		}
		else{
			req.login(employer, function(err){	
				if(err){
					res.status(400).json({'confirmation':'fail', 'message':'error'+err})
				}else{
					console.log('Authentication Successful');
					res.json(info)	
				}
			});
		}
	})(req, res, next);
});


//logout route
router.get('/employer/logout',function(req,res){
	req.session.destroy(function (err) {
		if(err){
			res.status(400).json({'confirmation':'fail', 'message':'error'+err})
		}else{
			res.json({ 'confirmation':'success', 'message':'Logged out.'})
		}
	});
});

router.post('/seeker/login', function(req, res, next){
	seekerPassport.authenticate('seeker', function(err, seeker, info){
		if(err) {
			res.json( {'confirmation':'fail', 'message':'error: '+err})		
		}
		else if(!seeker){
			res.json(info)
		}
		else{
			req.login(seeker, function(err){	
				if(err){
					res.status(400).json({'confirmation':'fail', 'message':'error'+err})
				}else{
					console.log('Authentication Successful');
					res.json(info)	
				}
			});
		}
	})(req, res, next);
});


//logout route
router.get('/seeker/logout',function(req,res){
	req.session.destroy(function (err) {
		if(err){
			res.json({
				confirmation: 'fail',
				message: 'error'+ err
			});
		}
		res.json({
			confirmation: 'success',
			result: 'seeker logged out'
		});
	});
});
module.exports = router;
