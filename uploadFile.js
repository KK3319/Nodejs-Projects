var http=require('http');
var fs=require('fs');
http.createServer(function(req,res){
    fs.readFile('trash.txt',function(err,data){
        res.writeHead(200,{'content-type':'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);









// var http = require('http');
// var fs = require('fs');
// http.createServer(function (req, res) {
//   fs.readFile('demofile1.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(8080);