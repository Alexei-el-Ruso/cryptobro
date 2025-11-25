var createError = require('http-errors');
var express = require('express');
var path = require('path');
var stylus = require('stylus');

var indexRouter = require('./routes/crypting');

var app = express();
app.use(express.json());
app.use(stylus.middleware(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

//app.use('/api/hash', usersRouter);//    Ver que pedo

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
