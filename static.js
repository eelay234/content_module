// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
var path = require('path');

module.exports = function(request, response) {
    console.log('Request', request.url);

    var filePath = '.' + request.url;

    var viewdir = 'views';
    if (filePath == './')
        filePath = viewdir + '/index.html';

    var extname = path.extname(filePath);
    if (extname == '.html' && request.url != '/')
        filePath = viewdir + request.url;

    if (request.url.match(/^\/private\/.+/))
    {
      console.log("match");
      filePath = viewdir + '/private.html';
      extname = path.extname(filePath);
    }

    console.log(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            fs.readFile('views/404.html', function(error, content) {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            });
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });


     // response.writeHead(200, {'Content-type': 'text/html'});
     // if(request.url === '/'){
     //    fs.readFile('views/index.html', 'utf8', function (errors, contents){
     //      response.write(contents); 
     //      response.end();
     //    });
     //  } else if(request.url === '/dojo.html'){
     //    fs.readFile('views/dojo.html', 'utf8', function (errors, contents){
     //      console.log("errors:"+errors);
     //      response.write(contents);
     //      response.end();
     //    });
     //  } else if(request.url === '/stylesheet/style.css'){
     //    fs.readFile('stylesheet/style.css', 'utf8', function (errors, contents){
     //      response.write(contents);
     //      response.end();
     //    });
     //  } else {
     //      response.end('File not found!!!');
     //  }
};