var express = require('express');
var router = express.Router();
var controllers = require('../controllers')
//defining api

//get all resource
router.get('/:resource',function(req,res,next){
	var resource = req.params.resource;
	var controller = controllers[resource];

	if(controller==null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid resource request: '+resource
		});
		return;
	}

	controller.find(req.query, function(err, results){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			});
			return;
		}
		res.json({
			confirmation: 'success',
			results: results
		});
	});

});

//add new resource
router.post('/:resource',function(req,res,next){
	var resource = req.params.resource;
	var controller = controllers[resource];

	if(controller==null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid resource request: '+resource
		});
		return;
	}

	controller.create(req.body, function(err,result){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			});
			return;
		}
		res.json({
			confirmation: 'success',
			result: result
		});
	});

});

//find single resource by id
router.get('/:resource/:id',function(req,res,next){
	var resource = req.params.resource;
	var controller = controllers[resource];

	if(controller==null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid resource request: '+resource
		});
		return;
	}

	var id = req.params.id;
	controller.findById(id, function(err,result){
		if(err){
			res.json({
				confirmation: 'fail',
				message: 'Not Found'
			});
			return;
		}
		res.json({
			confirmation: 'success',
			result: result
		})
	});

});

//update resource using id
router.put('/:resource/:id', function(req,res,next){
	var resource = req.params.resource;
	var controller = controllers[resource];

	if(controller==null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid resource request: '+resource
		});
		return;
	}

	var id = req.params.id;
	controller.update( id, req.body, function(err,result){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			});
			return;
		}
		res.json({
			confirmation: 'success',
			result: result
		});
	});
});

//delete resource using id
router.delete('/:resource/:id', function(req,res,next){
	var resource = req.params.resource;
	var controller = controllers[resource];

	if(controller==null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid resource request: '+resource
		});
		return;
	}

	var id = req.params.id;
	controller.delete( id, function(err){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			});
			return;
		}
		res.json({
			confirmation: 'success',
			result: 'Successfuly Deleted'
		});
	});
});


module.exports = router;
