// require .env
require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const passport = require('passport');
const passportConfig = require("./config/passport-config");
const conn = require('./config/connection');
const flash = require('connect-flash');
const app = express();

const port = process.env.PORT || 3000;

// import routes
const indexRoute = require("./routes/index-route");
const registerRoute = require("./routes/register-route");
const homeRoute = require("./routes/home-route");


app.use(morgan('tiny'));
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        url: process.env.DBURL,
        // ttl satuannya adalah second
        ttl: 60 * 60
    })
}));

app.use(flash());

// use passportjs
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


// use route
app.use('/', indexRoute);
app.use('/register', registerRoute);
app.use('/home', homeRoute);

app.listen(port, () => console.log('running at localhost:' + port));