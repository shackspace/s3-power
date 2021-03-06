#!/usr/bin/env node
var moment = require('moment')
var AWS = require('aws-sdk');

var cfgfile = process.env.CONFIG || './config.json';

console.log('Loading config from ' + cfgfile);
AWS.config.loadFromPath(cfgfile);

var s3 = new AWS.S3();
var net = require('net');

var client = new net.Socket();

client.on('data', function(data) {
  uploadData(data.toString('utf8'));
});

client.on('close', function() {
  console.log('Connection closed');
});


client.connect(11111, 'powerraw.shack', function() {
  console.log('Connected');
});



function uploadData(strval) {
	client.destroy();

	var params = {
		Bucket: 'shack-s3',
		Key: 'powerraw.shack/' + moment().format('X'),
		Body: strval
	};

	s3.putObject(params, function(err, data) {
		if (err) {
			console.log("--- [ERROR] - Caching Failed");
			console.log(err, err.stack); // an error occurred
		}
		else {
			console.log("--- File Cached");
			console.log(data);           // successful response
		}
	});
}
