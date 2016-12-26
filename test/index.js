var config = global._appConfig = require('../bin/config');
var app = require('../bin/app').listen(config.testPort);


require('./interface.test.js');