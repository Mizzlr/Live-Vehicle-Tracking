var server = require('express')(), port = 50000;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/LiveVehicleTracking';


server.listen(port, "0.0.0.0", function(){
	console.log("[START ] [" + Date() + 
		"] server listening on: http://0.0.0.0:" + port);
});

server.get('/ping', function(req, response){
	console.log("[PING  ] [" + Date() + "] echo sent, server uptime: " + 
		(process.uptime() + "").toHHMMSS());
	response.setHeader('Access-Control-Allow-Origin','*')
	var data = {"message":"Server is up @ http://localhost:" + port}
	response.status(200).send(JSON.stringify(data));	
});

server.get('/find', function(request, response){ 
	
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findCoordinate(db, request, response, function() {
			db.close();
		});
	});
});

var findCoordinate = function(db, request, response, callback){
		var queryCondition = {
			'vID': Number(request.query.vID), 
			'time' : Number(request.query.time)
		}		
		db.collection('coordinates').
		findOne( queryCondition, 
			function (err, doc){
				assert.equal(err,null);
				if (doc != null){
					doc = JSON.parse(JSON.stringify(doc));
					delete doc._id;
					console.log("[FOUND ] [" + Date() + "] " + JSON.stringify(doc));
					response.setHeader('Access-Control-Allow-Origin','*')
					response.status(200).send(JSON.stringify(doc));
				} else {
					console.log("[ERROR ] [" + Date() + "] " + 'no data found for ' + 
						JSON.stringify(queryCondition));					
					callback();
					response.setHeader('Access-Control-Allow-Origin','*')
					response.status(200).send(JSON.stringify(
						{'message':'No data found for time=' + request.query.time}));
				}
			});
	};


server.get('/pop', function(request, response){ 
	
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		popCoordinate(db, request, response, function() {
			db.close();
		});
	});
});

var popCoordinate = function(db, request, response, callback){
		var result = []
		var queryCondition = {'vID': Number(request.query.vID)};		
		db.collection('coordinates').find(queryCondition, 
			function(err, cursor){
				cursor.each(function(err, doc){
					if(doc != null){
						doc = JSON.parse(JSON.stringify(doc));
						delete doc._id;
						if (result.length == 0){
							result.push(doc);
						} else { 
							if (result[0].time < doc.time){
								result[0] = doc;
							}
						}
					} else {
						callback2();
					}
				})
			});

		var callback2 = function(){
			response.setHeader('Access-Control-Allow-Origin','*');
			if (result.length >= 1)	{
				console.log("[POPPED] [" + Date() + "] " + JSON.stringify(result[0]));
				response.status(200).send(result[0]);
				
			}
			else{
				console.log("[ERROR ] [" + Date() + "] " + 'no data found for ' + 
					JSON.stringify(queryCondition) + ' to pop');					
				response.status(200).send(JSON.stringify(
					{'message':'No data found for' + JSON.stringify(queryCondition)}));
			}
		callback();
		};
	};


server.get('/push', function(request, response){
	
	MongoClient.connect(url, function(err, db) {
		
		assert.equal(null, err);
		data = {
				'vID' : Number(request.query.vID),
				'time' : Number(request.query.time),
				'lat': Number(request.query.lat),
				'lng': Number(request.query.lng)
		};
		db.collection('coordinates').insertOne( data, 
		 function(err, result) {
		assert.equal(err, null);
		delete data._id;
		console.log("[PUSHED] [" + Date() + "] " + JSON.stringify(data));
	    db.close();
	    response.setHeader('Access-Control-Allow-Origin','*')
		response.send(JSON.stringify({message:data})); 
	  });
	});

	
});

server.get('/deleteAll', function(request, response){
	
	MongoClient.connect(url, function(err, db) {
		
		assert.equal(null, err);
		db.collection('coordinates').remove({},
		function(err, result) {
				assert.equal(err, null);
				data = 'remove all data, cleared MongoDB';
				console.log("[DELETE] [" + Date() + "] " + data);
				db.close();
				response.setHeader('Access-Control-Allow-Origin','*')
				response.send(JSON.stringify({message:data})); 
	  	});
	});
});

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}
