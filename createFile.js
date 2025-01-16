//var http=require('http');
var fs=require('fs');
fs.appendFile('updateFile.txt','New File',function(err){
    if(err) throw err;
    console.log("File created")
});