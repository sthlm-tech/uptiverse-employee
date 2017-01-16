var App = require("ms-core");
var config = require("./config.js");
App.init(config);
require("./employee/routes")();
