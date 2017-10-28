var Employer = require('../models/Employer.js');
var Seeker = require('../models/Seeker.js');

module.exports = {
	//find all resource with query
	find: function(params, callback) {
		Employer.find(params, function(err,employers){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, employers);
		})
	},

	//find single resource by id
	findById: function(id, callback) {
		Employer.findById(id, function(err, employer){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, employer);
		})
	},

	//create new resource
	create: function(params, req, callback) {
		Employer.create(params, function(err, employer){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, employer);
		});
	},

	//update resource by id
	update: function(id, params, callback){
		Employer.findByIdAndUpdate(id, params, {new:true}, function(err, employer){
			if(err){
				callback(err,null);
				return;
			}
			callback(null, employer);
		});
	},

	//delete resource by id
	delete: function(id, callback) {
		Employer.findByIdAndRemove(id, function(err){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, null);
		});
	},

	comparePassword: function( candidatePassword, hash, callback){
		if(hash){
			var isMatch = (candidatePassword==hash);
			callback(null, isMatch)	
		}
		else{
			callback(null, false);
			return;
		}	
	},

	addJob: function( jobId, empId, callback){
		Employer.findByIdAndUpdate(empId,{ $push:{ joblist:jobId} } ,function(err, employer){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, employer);
		});
	},

	invite: function(params, callback){
		Employer.find({'email':params.email}, function(err, employers){
			if(err){
				callback(err, null);
			}
			var employer = employers[0];
			var inviteObj = {
				job: params.jobId,
				seeker: params.seekerId
			}
			employer.invites.push(inviteObj);
			employer.save(function(err, employer){
				Seeker.findById(params.seekerId, function(err, seeker){
					if(err){
						callback(err, null);
					}
					seeker.invites.push(params.jobId);
					seeker.save(function(err, seeker){
						callback(err, {employer:employer, seeker:seeker});
					});
				});
			});
		});
	}
}
