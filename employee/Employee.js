var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    pnr: Number,
    birthday: { type: Date },
    googleid: String,
    picture: String,
    developmentGoals: String,

});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
