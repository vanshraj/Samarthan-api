var Disability = require('../models/Disability.js');

module.exports = {
	//find all resource with query
	find: function(params, callback) {
		Disability.find(params, function(err,disabilities){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, disabilities);
		})
	},

	//find single resource by id
	findById: function(id, callback) {
		Disability.findById(id, function(err, disability){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, disability);
		})
	},

	//create new resource
	create: function(params, req , callback) {
		Disability.create(params, function(err, disability){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, disability);
		});
	},

	//update resource by id
	update: function(id, params, callback){
		Disability.findByIdAndUpdate(id, params, {new:true}, function(err, disability){
			if(err){
				callback(err,null);
				return;
			}
			callback(null, disability);
		});
	},

	//delete resource by id
	delete: function(id, callback) {
		Disability.findByIdAndRemove(id, function(err){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, null);
		});
	}
}
