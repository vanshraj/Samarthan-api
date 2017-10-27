var Job = require('../models/Job.js');

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
	create: function(params, callback) {
		Job.create(params, function(err, job){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, job);
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
