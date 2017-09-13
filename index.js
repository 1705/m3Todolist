var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();
var bodyParser = require('body-parser');
// var methodOverride = require('method-override')

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.urlencoded());
// app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/Company', { useMongoClient: true });

var Schema = new mongoose.Schema({
	_id: String,
	name: String,
	age: Number
});

var user = mongoose.model('emp', Schema);

app.get('/views', function(req, res){
	user.find({}, function(err, docs){
		if(err) res.json(err);
		else    res.render('index', {users: docs});
	});
});

app.post('/new', function(req, res){
	new user({
		_id    : req.body.email,
		name: req.body.name,
		age   : req.body.age				
	}).save(function(err, doc){
		if(err) res.json(err);
		else    res.redirect('/views');
	});
});
 
 
 
app.listen(4000, function(){
	console.log('now listening for requests');
});