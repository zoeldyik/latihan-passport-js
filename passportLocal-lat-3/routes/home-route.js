const express = require("express");
const router = express.Router();

// set protection to routes
// req.user adalah obejct yang di buat oleh passport js
// dan dapat di akses dari mana saja jika user berhasil login
function ceklogin(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/')
    }
}

router.get("/", ceklogin, (req, res) => {
    res.render('home-view');
})

router.get("/user", ceklogin, (req, res) => {
    res.send(req.user);
})

module.exports = router;