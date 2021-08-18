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
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
const csrfMiddleware = csrf({ cookie: true });
app.use(csrfMiddleware); // proteccion csrf en cada peticion


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
    const error = new Error("El recurso solicitado no existe.");
    error.status = 404;
    next(error);
  });
  
  // Error handler
  app.use((error, req, res, next) => {
      if (error.status) {
      res.status(error.status).render('error', {layout: 'errorLayout', title: 'Error ' + error.status, errorStatus: error.status, errorMsg: error.message});
      } else {
      res.status(500).render('error', {layout: 'errorLayout', title: 'Error 500', errorStatus: 500, errorMsg: 'Internal Server Error.'});
      }
    });


/*********************/
module.exports = app;
