var DisabilityController = require('./DisabilityController');
var EmployerController = require('./EmployerController');
var JobController = require('./JobController');
var SeekerController = require('./SeekerController');

module.exports = {
	disability: DisabilityController,
	employer: EmployerController,
	job: JobController,
	seeker: SeekerController
}
