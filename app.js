require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var sequelize = require('./db.js');

sequelize.sync(); // tip: {force: true} for resetting tables

app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

http.listen(process.env.PORT || 3000, function(){
	console.log('App is listening on 3000.')
});


app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));
app.use('/api/log', require('./routes/log'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/test', function(req, res){
	res.send("Hello World");
});



