var mongoose = require('mongoose');
var Job = require('./Job');

// Employer Schema
var EmployerSchema = mongoose.Schema({
	password: { type: String },
	email: { type: String, index:true },
	name: { type: String },
	joblist:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Job'} ],
	phone: { type: String }
});

var Employer = mongoose.model('Employer', EmployerSchema);

module.exports = Employer;