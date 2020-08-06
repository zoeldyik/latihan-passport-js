const express = require('express');
const router = express.Router();
const userModel = require('../model/user-model');

// prevent user to access route before login
function cekLogin(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}


router.get('/', cekLogin, (req, res) => {
    res.render('home-view');
})

router.get('/user-detail', cekLogin, (req, res) => {
    // jika user sudah berhasil login, passpoert akan membuat 'req.user' berisi data user yg sedang login
    // yang dapat di akses di manapun
    const id = req.user.googleId;
    userModel.findOne({ googleId: id }, (err, doc) => {
        if (err) return console.log(err);
        res.send(doc);
    })
})

router.get('/all-user-detail', cekLogin, (req, res) => {
    // jika user sudah berhasil login, passpoert akan membuat 'req.user' berisi data user yg sedang login
    // yang dapat di akses di manapun
    const id = req.user.googleId;
    userModel.find((err, docs) => {
        if (err) return console.log(err);
        res.send(docs);
    })
})
module.exports = router;