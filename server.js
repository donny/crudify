var restify = require('restify');
var cf = require('cf-runtime');
var log4js = require('log4js');
var util = require('util');
var mongoose = require('mongoose');
var crudify = require('./lib/crudify');

var logger = log4js.getLogger();

var host = (cf.CloudApp.host || 'localhost');
var port = (cf.CloudApp.port || 8080);

var mConfig;

if (cf.CloudApp.runningInCloud) {
	if (cf.MongoClient !== undefined) {
		mConfig = cf.CloudApp.serviceProps.mongodb;
	} else {
		logger.error('No Mongo');
	}
} else {
	mConfig = {url: 'mongodb://localhost:27017/db'};
}

mongoose.connect(mConfig.url);



// Create the RESTful server.
var server = restify.createServer();
server.use(restify.queryParser({mapParams: false}));
server.use(restify.bodyParser({mapParams: true}));

require('./models');
crudify(server, '/data', 'Data');

server.listen(port, function(){
	console.log("Listening at %s", server.url);
});
