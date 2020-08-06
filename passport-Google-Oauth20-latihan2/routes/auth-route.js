const express = require('express');
const router = express.Router();
const passport = require('passport');

// prevent user to access route before login
function cekLogin(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        next();
    }
}
router.get('/google', cekLogin,
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/redirect', cekLogin,
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


module.exports = router;