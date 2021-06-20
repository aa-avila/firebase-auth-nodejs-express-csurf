const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const express = require('express');
const unless = require('express-unless');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
// const admin = require('firebase-admin');
// const serviceAccount = require('./firebaseCredentials.json');
const fbAuth = require('./firebaseConnect');
const routes = require('./routes/routes');


/*********************/
// FIREBASE ADMIN
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

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

// isAuth
// const isAuth = async (req, res, next) => {
//     try {
//         const sessionCookie = req.cookies.session || "";

//         await fbAuth
//             .verifySessionCookie(sessionCookie, true /** checkRevoked */);

//         console.log('Estas logueado');
//         next();

//     } catch (error) {
//         console.log('Error en isAuth:', error);
//         res.redirect('/login');
//     }
// }

//isAuth use - unless
// isAuth.unless = unless;
// app.use(isAuth.unless({
//     path: [
//         { url: '/', methods: ['GET'] },
//         { url: '/login', methods: ['GET'] },
//         { url: '/signup', methods: ['GET'] },
//         { url: '/sessionLogin', methods: ['POST'] }
//     ]
// }));

/*********************/
// ROUTES
app.use(routes);

/*********************/
// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));


/*********************/
module.exports = app;
