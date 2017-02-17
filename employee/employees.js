var Employee = require("./Employee");
var when = require('when');
function EmployeeService() {
	var self = this;

	self.getAll = function(){
		var deferred = when.defer();

		Employee.find(function(err, employees) {
			deferred.resolve(employees);
	  })
		.sort( { lastname: 1 } );

		return deferred.promise;
	};

	self.getById = function(id){
		var deferred = when.defer();

		Employee.findOne({"_id" : id}, function(err,employee){
			deferred.resolve(employee);
		});

		return deferred.promise;
	};

	self.getByUsername = function(id){
		var deferred = when.defer();

		Employee.findOne({"username" : id}, function(err,employee){
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
		employee.username = in_data.username;
		employee.birthday = in_data.birthday;
		employee.googleid = in_data.googleid;
		employee.picture = in_data.picture;
		employee.developmentGoals = in_data.developmentGoals;
		employee.description = in_data.description;
		employee.email = in_data.email;

		employee.save(function(err, createdEmployee){
			deferred.resolve(createdEmployee);
		});

		return deferred.promise;
	}

	self.save = function(in_data){
		var deferred = when.defer();

		Employee.findById(in_data._id, function (err, employee) {
  		if (err) return handleError(err);

			employee.firstname = in_data.firstname;
			employee.lastname	 = in_data.lastname;
			employee.birthday = in_data.birthday;
			employee.googleid = in_data.googleid;
			employee.picture = in_data.picture;
			employee.developmentGoals = in_data.developmentGoals;
			employee.description = in_data.description;
			employee.email = in_data.email;

		  employee.save(function (err, updatedEmployee) {
		    if (err) return handleError(err);
				deferred.resolve(updatedEmployee);
		  });
		});


		return deferred.promise;
	}

}
module.exports = new EmployeeService();
