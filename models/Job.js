var mongoose = require('mongoose');
var Employer = require('./Employer');
var Disability = require('./Disability');

// Job Schema
var JobSchema = mongoose.Schema({
	company: { type: String },
	jobTitle: { type: String },
	jobDescription: { type: String },
	salaryRange: { min:{ type:Number}, max:{ type:Number } },
	perks:{ type: String },
	disability:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Disability'} ],
	employer:{ type: mongoose.Schema.Types.ObjectId, ref: 'Employer'}
});

var Job = mongoose.model('Job', JobSchema);

module.exports = Job;