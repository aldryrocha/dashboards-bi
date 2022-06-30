var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');


require('./auth')(passport);

function autenthicationMiddleware(req, res, next){
  if(req.isAuthenticated()) return next(); //next is the next function of the pile os paths
  res.redirect('/login');
}


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//EU ADD
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//express autenthication
app.use(session({
  secret: '123', //TEM QUE MUDAR PARA VARIAVEL DE AMBIENTE
  resave: false, 
  saveUninitialized: false,
  cookie: {maxAge: 60*60*1000}
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/login', loginRouter);
app.use('/users', autenthicationMiddleware, usersRouter);
app.use('/dashboard', autenthicationMiddleware, dashboardRouter);
app.use('/', autenthicationMiddleware, indexRouter);
app.use('/logout', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
