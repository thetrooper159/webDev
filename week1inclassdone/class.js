var http = require('http'), fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
	if(!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err,data) {
		if(err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('500 - Internal Error');
		} else {
			res.writeHead(responseCode, { 'Content-Type': contentType });
			res.end(data);
		}
	});
}

http.createServer(function(req,res){
	// normalize url by removing querystring, optional
	// trailing slash, and making lowercase
	var path = req.url.replace(/\/?(?:\?.*)?$/, '')
	.toLowerCase();
	switch(path) {
    case '':
    serveStaticFile(res, '/home.html', 'text/html');

    break;
		case '/logo':
		serveStaticFile(res, '/logo.jpg', 'img/logo.jpg');
		break;
		case '/about':
    	serveStaticFile(res, '/about.html', 'text/html');
		default:
		serveStaticFile(res, '/404.html', 'text/html', 404);
		break;
	}
}).listen(3002);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
