var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    birthday: { type: Date },
    googleid: String,
    picture: String,
    developmentGoals: String,
    description: String,
    email: String,

});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
