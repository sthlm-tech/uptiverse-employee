'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var EmployeeSchema = new mongoose.Schema({
	employeeNumber: {type: Number, required: true, unique: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	birthDate: {type: Date, required: true},
	email: {type: String, unique: true, required: true},
	phone: {type: String, required: true},
	internalRoles: [String]
});

export default mongoose.model('Employee', EmployeeSchema);
