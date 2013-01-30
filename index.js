#! /usr/bin/env node

var request = require("request");

var baseURL = "https://www.highschoolcube.com/api/v1/%.json";

var exports = module.exports = function(username, password, cb){
	this.jar = request.jar();
	if(username){
		this.auth(username, password, cb);
	}
	return this;
}

exports.request = function(func, cb, params, method){
	if(!method){
		method = "GET";
	}
	if(!params){
		params = {};
	}
	var req = request({
		uri: baseURL.replace("%", func),
		qs: (method == "GET" ? params : false),
		method: method,
		form: (method == "GET" ? false : params),
		followAllRedirects: true,
		jar: this.jar,
		json: true,
		strictSSL: true
	}, function(err, res, body){
		if(err){
			return cb(err);
		}
		if(typeof body != "object"){
			return cb(new Error("Response Not JSON"));
		}
		cb(false, body);
	});
	return req;
}

exports.get = function(func, cb, params){
	this.request(func, cb, params, "GET");
}

exports.post = function(func, cb, params){
	this.request(func, cb, params, "POST");
}

exports.put = function(func, cb, params){
	this.request(func, cb, params, "PUT");
}

exports.auth = function(username, password, cb){
	this.get("notifications", cb, {email: username, password: password}, "GET");
}