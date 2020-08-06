const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../model/user-model');


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/redirect"
},
    (accessToken, refreshToken, profile, cb) => {
        //cek apakah user sudah ada di db
        userModel.findOne({ googleId: profile.id }, (err, user) => {
            if (err) return console.log(err);
            // jika user sudah ada di db
            if (user) {
                cb(null, user);
            } else {
                // jika tidak ada user di db, maka buat user baru
                const createUser = new userModel({
                    googleId: profile.id,
                    username: profile.username
                })

                createUser.save((err, newuser) => {
                    if (err) return console.log(err);
                    cb(null, newuser);
                })
            }

        })
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