var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
var mysql = require('mysql');
var http = require("http");

app.use(express.static(path.join(__dirname,'src')));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(request,resp,next){
resp.render('index')
});

var _Login = require('./Server/_Login.js');
var _Insert = require('./Server/_Insert.js');
var _Delete = require('./Server/_Delete.js');
var _Update = require('./Server/_Update.js');
var _Read = require('./Server/_Read.js');

app.use('/webservices', _Insert, _Update, _Delete, _Read, _Login);

app.listen(3000, function(){
  console.log('El servidor Esta En llamas!');
});

var connection = mysql.createConnection({

   host     : process.env.RDS_HOSTNAME,
   user     : process.env.RDS_USERNAME,
   password : process.env.RDS_PASSWORD,
   database : process.env.RDS_DATABASE,
   port     : process.env.RDS_PORT

});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();