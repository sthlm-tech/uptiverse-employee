/**
 * Configuration for app
 */
module.exports = {
	/**
	 * Server port
	 */
	port: 5000,
	/**
	 * Versioned configuration
	 */
		/**
		 * Enable the caching module
		 */
		cacheEnabled: false,
		/**
		 * How long to cache data in the cache module
		 */
		cacheDuration: 3600000,
		db_connectionString: 'mongodb://user-service-user:user-service-user@ds015636.mlab.com:15636/heroku_q9zz0x8s',
		eureka : {
		  instance: {
		    app: 'uptiverse-employee',
		    hostName: 'uptiverse-employee.herokuapp.com',
		    statusPageUrl: 'https://uptiverse-employee.herokuapp.com',
		    port: {
		      '$': 5000,
		      '@enabled': 'true',
		    },
		    vipAddress: 'jq.test.something.com',
		    dataCenterInfo: {
		      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
		      name: 'MyOwn',
		    },
		  },
		  eureka: {
		    serviceUrl: [ 'https://user:incorrect2016@uptiverse-discovery.herokuapp.com/eureka/apps/' ],
		  },
		}
};
