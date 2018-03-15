var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('./server/passport');
var signin = require('./server/api/signin');
var register = require('./server/api/register');

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/signin', signin(passport));
app.use('/api/register', register(passport));

var db = require('./server/database');
db.query('SELECT NOW()', (res) => {
  console.log(`PostgreSQL connected: ${res[0].now}.`);
});

app.listen(3001, () => {
  console.log(`Server running on port 3001...`);
});
