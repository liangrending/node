const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const config = require('./config');

function lrd(){
	this.hostname = 'localhost';
	this.port = '80';
	
	this.getRequestInfo = [];
	this.postRequestInfo = [];

	this.get = function(url,callback){
		var length = this.getRequestInfo.length;
		this.getRequestInfo[length] = new object();
		this.getRequestInfo[length].url = url;
		this.getRequestInfo[length].callback = callback;
	};

	this.post = function(url,callback){
		var length = this.postRequestInfo.length;
		this.postRequestInfo[length] = new object();
		this.postRequestInfo[length].url = url;
		this.postRequestInfo[length].callback = callback;
	};

	this.initGetParam = function(req){
		this.query = url.parse(req.url,true).query;
	};

	this.readStatic = function(callback){
		fs.readFile();
	};

	this.setHead = function(req,res){
		var pageName = path.basename(req.url);
		var arr = pageName.split('.');
		var	contentType = config.contentType[arr[arr.length-1]];
		return contentType || 'text/plain';
	};

	this.init = function(){
		var _this = this;
		this.server = http.createServer((req,res) => {
				var requestPage = path.basename(req.url);
				var contentType = _this.setHead(req,res);
				res.writeHead(200, {'Content-Type': contentType });
				debugger;
				fs.readFile('./view/'+requestPage,(err,data) => {
					if(err) res.end("404");
					res.end(data);
				});
		});
		this.server.listen(this.port,this.hostname,() => {
			console.log(`Server running at http://${this.hostname}:${this.port}/`);
		});
	};

	this.listen = function(port){
		this.port = port;
		this.init();
	};
}
module.exports = new lrd();