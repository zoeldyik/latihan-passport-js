const express = require('express');
const router = express.Router();

function cekLogin(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        next();
    }
}

router.get('/', cekLogin, (req, res) => {
    res.render('login-view');
})


module.exports = router;