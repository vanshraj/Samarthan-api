var Job = require('../models/Job.js');
var DisabilityController = require('./DisabilityController');
var EmployerController = require('./EmployerController');

module.exports = {
	//find all resource with query
	find: function(params, callback) {
		Job.find(params, function(err,jobs){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, jobs);
		})
	},

	//find single resource by id
	findById: function(id, callback) {
		Job.findById(id, function(err, job){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, job);
		})
	},

	//create new resource
	//create new resource
	create: function(params, req, callback) {
		DisabilityController.find( { type: params.disability }, function(err, results){
			if(err){
				callback(err,null);
				return;
			}
			// console.log(req);
			EmployerController.find({'email': params.email }, function(err, employers){
				params = {
					company: employers[0].name,
					jobTitle: params.jobTitle,
					jobDescription: params.jobDescription,
					salaryRange: { min: params.min, max: params.max },
					perks: params.perks,
					disability: results[0]._id,
					employer: employers[0]._id
				}

				Job.create(params, req, function(err, job){
					if(err){
						callback(err, null);
						return;
					}
					EmployerController.addJob( job._id, params.employer, function(err, employer){
						if(err){
							callback(err, null);
						}else{
							callback(null, job);
						}
					});
				});
			})
		});
	},

	//update resource by id
	update: function(id, params, callback){
		Job.findByIdAndUpdate(id, params, {new:true}, function(err, job){
			if(err){
				callback(err,null);
				return;
			}
			callback(null,job);
		});
	},

	//delete resource by id
	delete: function(id, callback) {
		Job.findByIdAndRemove(id, function(err){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, null);
		});
	}
}
