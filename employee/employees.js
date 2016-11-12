var config = require("./../config");
var mongoose = require('mongoose');
var Employee = require("./Employee");
var when = require('when');
function EmployeeService() {
	var self = this;

	mongoose.connect(config.db_connectionString);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	  // we're connected!
	});

	self.getAll = function(){
		var deferred = when.defer();

		Employee.find(function(err, employees) {
			deferred.resolve(employees);
	  });

		return deferred.promise;
	};

	self.getById = function(id){
		var deferred = when.defer();

		Employee.findOne({"_id" : id}, function(err,employee){
			deferred.resolve(employee);
		});

		return deferred.promise;
	};

	self.getByEmail = function(email){
		var deferred = when.defer();

		Employee.findOne({"email" : email}, function(err,employee){
			deferred.resolve(employee);
		});

		return deferred.promise;
	};

	self.create = function(in_data){
		var deferred = when.defer();
		var employee = new Employee();
		employee.firstname = in_data.firstname;
		employee.lastname	 = in_data.lastname;
		employee.pnr = in_data.pnr;
		employee.birthday = in_data.birthday;
		employee.googleid = in_data.googleid;
		employee.picture = in_data.picture;
		employee.developmentGoals = in_data.developmentGoals;

		employee.save(function(err, createdEmployee){
			deferred.resolve(createdEmployee);
		});

		return deferred.promise;
	}

}
module.exports = new EmployeeService();
