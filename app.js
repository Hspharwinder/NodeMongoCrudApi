require('./Model/db');

const bookController  = require("./Controllers/BookController/bookController");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/book', bookController);

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



// var mongoose = require('mongoose');
// const url = 'mongodb://ip/clectionName';
// mongoose.connect(url);
// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
 
// db.once('open', function() {
//     console.log("Connection Successful!");
    
//     // define Schema
//     var BookSchema = mongoose.Schema({
//       name: String,
//       price: Number,
//       quantity: Number
//     });
 
//     // compile schema to model
//     var Book = mongoose.model('Book', BookSchema, 'bookstore');
 
//     // a document instance
//     var book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });
 
//     // save model to database
//     book1.save(function (err, book) {
//       if (err) return console.error(err);
//       console.log(book.name + " saved to bookstore collection.");
//     });
    
// });
