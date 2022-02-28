module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// for more about customizing your Truffle configuration!
	networks: {
		development: {
			host: '127.0.0.1',
			port: 7545,
			network_id: '*' // Match any network id
		}
	},

		
	  // Configure your compilers
	compilers: {
		solc: {
		  version: "0.8.6",    
		}
	},
	
	  
	
	db: {
		enabled: false
	}
};
