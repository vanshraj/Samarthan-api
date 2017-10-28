var mongoose = require('mongoose');
var Disability = require('./Disability');
var Job = require('./Job');

// Seeker Schema
var SeekerSchema = mongoose.Schema({
	password: { type: String },
	email: { type: String, index:true },
	name: { type: String },
	disability:{ type: mongoose.Schema.Types.ObjectId, ref: 'Disability'},
	phone: { type: String },
	invites:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Job'} ],
	apply:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Job'} ]
});

var Seeker = mongoose.model('Seeker', SeekerSchema);

module.exports = Seeker;