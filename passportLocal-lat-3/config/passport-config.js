const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require("../model/user-model");
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {
        userModel.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                console.log('username salah');
                return done(null, false);
            }

            // cek password
            const cekPassword = bcrypt.compareSync(password, user.password)
            if (!cekPassword) {
                console.log('password salah');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err, user);
    });
});