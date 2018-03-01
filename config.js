module.exports = {
	enableSecurity: true,
	port: 5000,
	cacheEnabled: false,
	cacheDuration: 3600000,
	db_connectionString: process.env.MONGODB_URI || "",
	auth: {
		authServiceUrl: process.env.AUTH_SERVICE_URL || ""
	},
	communicator:{
		path: process.env.COMMUNICATOR_PATH || ""
	},
	service: {
		name: "uptiverse-employees",
		host: process.env.SERVICE_URL || "",
		secret: process.env.SERVICE_SECRET || ""
	},
	pulse: {
		shouldRegister: true,
		path:"/api/pulse"
	}
};
