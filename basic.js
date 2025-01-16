

var http=require('http');
http.createServer(function(res,req){
   res.writeHead(200,{'content-type':'text/plain'});
   res.end("Server Started")
}).listen(4040)