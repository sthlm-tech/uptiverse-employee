var express = require("express");
var bodyParser = require("body-parser");
var config = require("./../config");
var passport = require("./passport");
var Eureka = require('eureka-client').Eureka;
var cors = require('cors');

var App = {
	Express: {},
	Server: {},
	init: function() {
		App.Express = express();

		App.Express.use(cors());
		App.Express.use(bodyParser.urlencoded());
		App.Express.use(bodyParser.json());

		App.Express.use(passport.initialize());

		App.Express.use(passport.authenticate('jwt', { session: false}));
		require("./../routes")();

		App.Server = App.Express.listen(process.env.PORT || config.port, function() {
		    console.log("Listening on port %d", App.Server.address().port);
		});
/*
		App.Eureka = new Eureka(config.eureka);

    App.Eureka.start();*/
	}
};

module.exports = App;
