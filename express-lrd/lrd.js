const http = require('http');
const url = require('url');
const fs = require('fs');

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

	this.init = function(){
		this.server = http.createServer((req,res) => {
				res.writeHead(200, {'Content-Type': 'text/html' });
				fs.readFile('./view/index.html',(err,data) => {
					if(err) throw err;
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