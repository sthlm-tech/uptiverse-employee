'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeEmployees = [];

    $http.get('/api/employees').then(response => {
      this.awesomeEmployees = response.data;
      socket.syncUpdates('employee', this.awesomeEmployees);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('employee');
    });
  }

  addEmployee() {
      this.$http.post('/api/employees', 
	{ employeeNumber: this.newEmployeeNumber,
          firstName: this.newEmployeeFirstName,
	  lastName: this.newEmployeeLastName,
          birthDate: this.newEmployeeBirthDate,
          email: this.newEmployeeEmail,
          phone: this.newEmployeePhone
	  });
  }

  deleteEmployee(employee) {
    this.$http.delete('/api/employees/' + thing._id);
  }
}

angular.module('clientApp')
  .controller('MainController', MainController);

})();
