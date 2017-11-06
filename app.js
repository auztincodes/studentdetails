var http = require('http');
var path = require('path');
var express = require('express');
var studentControllers = require('./controllers/studentControllers')
var app = express();

//setting up template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//static files

app.use(express.static(path.join(__dirname, 'public')));



studentControllers(app);

//listen to port
app.listen(process.env.PORT || 3000);
console.log('you are listen to a port');
