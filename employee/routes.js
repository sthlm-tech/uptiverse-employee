var App = require("./../core/core");
var employees = require("./employees")	;

var baseUrl = "/employees"
module.exports = function() {

	App.Express.get( baseUrl, function (req, res) {
			employees.getAll()
			.then(function(response) {
				res.send(response);
			});
	});

	App.Express.get( baseUrl + "/me", function (req, res) {
			employees.getByEmail(req.user.email)
			.then(function(response) {
				res.send(response);
			});
	});

	App.Express.get( baseUrl + "/:id", function (req, res) {
			employees.getById(req.params.id)
			.then(function(response) {
				res.send(response);
			});
	});

	App.Express.post( baseUrl + "/create", function (req, res) {
			employees.create(req.body.employee)
			.then(function(response) {
				res.send(response);
			});
	});

	App.Express.post( baseUrl + "/save", function (req, res) {
			employees.save(req.body)
			.then(function(response) {
				res.send(response);
			});
	});

};
