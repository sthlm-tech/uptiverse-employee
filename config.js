module.exports = {
	enableSecurity: true,
	port: 5000,
	cacheEnabled: false,
	cacheDuration: 3600000,
	db_connectionString: process.env.MONGODB_URI || "",
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
