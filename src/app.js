const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const routes = require('./routes/routes');


/*********************/
// EXPRESS APP
const app = express();

// SET PORT
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

/*********************/
// ENGINE
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

/*********************/
// MIDDLEWARES
const csrfMiddleware = csrf({ cookie: true });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrfMiddleware); // proteccion csrf en cada peticion
app.use(morgan('dev'));

// csrfToken
app.all('*', (req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken()); // crea nuevo csrfToken
    next();
});

/*********************/
// ROUTES
app.use(routes);


/*********************/
// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));


/*********************/
// ERROR HANDLING
// Error 404
app.use((req, res, next) => {
    const error = new Error("La página solicitada no existe.");
    error.status = 404;
    next(error);
  });
  
  // Error handler
  app.use((error, req, res, next) => {
      res.status(error.status || 500).render('error', {layout: 'errorLayout', title: 'Error ' + error.status, errorStatus: error.status, errorMsg: error.message || 'Internal Server Error'});
    });


/*********************/
module.exports = app;
