const express = require("express");
const router = express.Router();
const passport = require('passport');

// ROUTE /
router.get("/", (req, res) => {
    if (req.user) {
        return res.redirect('/home');
    }
    res.render('login-view');
})


router.post("/", passport.authenticate('local', { failureRedirect: '/', successRedirect: '/home' }));
// --------------------------------------------------------------


// ROUTE /logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    // hapus property pada req.user yg di buat oleh passport js
    // setiap kali user berhasil login
    req.logout();
    res.redirect('/');
})
// -------------------------------------------
module.exports = router;