var mongoose = require('mongoose');
var Job = require('./Job');
var Seeker = require('./Seeker');

// Employer Schema
var EmployerSchema = mongoose.Schema({
	password: { type: String },
	email: { type: String, index:true },
	name: { type: String },
	joblist:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Job'} ],
	phone: { type: String },
	invites:[ {
		job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
		seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'Seeker'}
	} ],
	apply:[ { 
		job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
		seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'Seeker'}
	} ]
});

var Employer = mongoose.model('Employer', EmployerSchema);

module.exports = Employer;