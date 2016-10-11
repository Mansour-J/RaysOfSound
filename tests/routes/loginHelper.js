var superagent = require('superagent');
var agent = superagent.agent();

var adminAccount = {
  "username": "admin",
  "password": "admin"
};

exports.login = function(request, done) {
	request
		.post('/login')
		.send(adminAccount)
		.end(function (err, res) {
			if(err) throw err;
			agent.saveCookies(res);
			done(agent);
		});
};