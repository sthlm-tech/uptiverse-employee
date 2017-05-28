var Employee = require("./Employee");
var when = require('when');
function EmployeeService() {
	var self = this;

	self.getAll = function(){
		var deferred = when.defer();

		Employee.find(function(err, employees) {
			deferred.resolve(employees);
	  })
		.sort( { firstname: 1 } );

		return deferred.promise;
	};

	self.getById = function(id){
		var deferred = when.defer();

		Employee.findOne({"_id" : id}, function(err,employee){
			deferred.resolve(employee);
		});

		return deferred.promise;
	};

	self.getByConnection = function(connection, id){
		var deferred = when.defer();

		var query = {};
		var connectionIdentifier = "connections." + connection + ".id";
		query[connectionIdentifier] = id;
		Employee.find(query, function(err,employee){
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

		for (var property in in_data) {
			if (in_data.hasOwnProperty(property)) {
					employee[property] = in_data[property];
			}
		}

		employee.save(function(err, createdEmployee){
			deferred.resolve(createdEmployee);
		});

		return deferred.promise;
	}

	self.save = function(in_data){
		var deferred = when.defer();

		Employee.findById(in_data._id, function (err, employee) {
			for (var property in in_data) {
		    if (in_data.hasOwnProperty(property)) {
						employee[property] = in_data[property];
		    }
			}

		  employee.save(function (err, updatedEmployee) {
				deferred.resolve(updatedEmployee);
		  });
		});


		return deferred.promise;
	}

	self.sync = function(id, connection, in_data){
		var deferred = when.defer();

		self.getByConnection(connection, id)
		.then(function(employees){
				if(employees.length == 0){
					if(!in_data.connections){ in_data.connections = {} }
					in_data.connections[connection] = id;
					self.create(in_data)
					.then(function(employee){
						deferred.resolve(employee);
					});
				}
				else{
					var employee = employees[0];
					for(var property in in_data) {
						if (in_data.hasOwnProperty(property)) {
								employee[property] = in_data[property];
						}
					}
					employee.save(function (err, updatedEmployee) {
						console.log(err);
						console.log(updatedEmployee);
						deferred.resolve(updatedEmployee);
					});
				}
		});

		return deferred.promise;
	}

}
module.exports = new EmployeeService();
