var mongoose = require('mongoose');
var db = mongoose.connection;

// Disability Schema
var DisabilitySchema = mongoose.Schema({
	type: { type: String },
	advice: { type:Array, default:[] }
});

var Disability = mongoose.model('Disability', DisabilitySchema);

module.exports = Disability;