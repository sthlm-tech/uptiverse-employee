module.exports = {
	enableSecurity: true,
	port: 5000,
	cacheEnabled: false,
	cacheDuration: 3600000,
	db_connectionString: 'mongodb://user-service-user:user-service-user@ds015636.mlab.com:15636/heroku_q9zz0x8s',
	communicator:{
		path: process.env.COMMUNICATOR_PATH || "",
		token: process.env.COMMUNICATOR_TOKEN || ""
	},
	service: {
		name: "uptiverse-employee",
		host: process.env.SERVICE_URL || ""
	},
	pulse: {
		shouldRegister: true,
		path:"/api/pulse"
	}
};
