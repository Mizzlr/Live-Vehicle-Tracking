var server = require('express')(); port = 50000;

server.listen(port, function(){
	console.log('server is up!!');
});

server.get('/', function(req, res){
	message = 'Hi, I am you AWS Node.js server'
	console.log(message);
	res.send(message);
});
