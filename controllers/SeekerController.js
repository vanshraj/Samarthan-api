var Seeker = require('../models/Seeker.js');
var DisabilityController = require('./DisabilityController');

module.exports = {
	//find all resource with query
	find: function(params, callback) {
		Seeker.find(params, function(err,seekers){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, seekers);
		})
	},

	//find single resource by id
	findById: function(id, callback) {
		Seeker.findById(id, function(err, seeker){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, seeker);
		})
	},

	//create new resource
	create: function(params, req, callback) {
		DisabilityController.find( { type: params.disability }, function(err, results){
			if(err){
				callback(err,null);
				return;
			}
			params.disability = results[0]._id;
			Seeker.create(params, function(err, seeker){
				if(err){
					callback(err, null);
					return;
				}
				callback(null, seeker);
			});
		});
	},

	//update resource by id
	update: function(id, params, callback){
		Seeker.findByIdAndUpdate(id, params, {new:true}, function(err, seeker){
			if(err){
				callback(err,null);
				return;
			}
			callback(null,seeker);
		});
	},

	//delete resource by id
	delete: function(id, callback) {
		Seeker.findByIdAndRemove(id, function(err){
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
	}
}
