var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var employeeSchema = new Schema({
	employeeNumber: {type: Number, required: true, unique: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	birthDate: {type: Date, required: true},
	email: {type: String, unique: true, required: true},
	phone: {type: String, required: true},
	internalRoles: [String]
	
})

// export 'Employee' model so we can interact with it in other files
module.exports = mongoose.model('Employee',employeeSchema);
