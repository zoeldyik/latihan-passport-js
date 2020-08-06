require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const passportConfig = require('./config/passport-config');
const conn = require('./config/connection');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

// require root
const homeRoute = require('./routes/home-route');
const logoutRoute = require('./routes/logout-route');
const loginRoute = require('./routes/login-route');
const authRoute = require('./routes/auth-route');


app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'rahasia',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        url: process.env.DBURL,
        collection: 'session-google-oauth',
        // satuannya second
        ttl: 60 * 60 * 2
    })
}));
app.use(passport.initialize());
app.use(passport.session());



// set Route
app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/auth', authRoute);



app.listen(port, () => console.log('live at localhost:' + port));