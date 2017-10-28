var Employer = require('../models/Employer.js');

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
	}
}
