var App = require("ms-core");
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

	App.Express.get( baseUrl + "/:username", function (req, res) {
			employees.getByUsername(req.params.username)
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

	App.Express.post( baseUrl + "/sync/:connection/:id", function (req, res) {
			employees.sync(req.params.id, req.params.connection, req.body)
			.then(function(response) {
				res.send(response);
			});
	});

};
