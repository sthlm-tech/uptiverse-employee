var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    birthday: { type: Date },
    googleid: String,
    picture: String,
    developmentGoals: String,
    developmentGoalsLink: String,
    description: String,
    email: String,
    office: String,
    connections: {
      linkedIn: { id: String },
      discord: { id: String },
      slack: { id: String }
      google: { id: String },
      facebook: { id: String },
      github: { id: String },
      phone: { id: String },
      mail: { id: String }
    },

});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
