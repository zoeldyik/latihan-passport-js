const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require("../model/user-model");

// route /register
router.get("/", (req, res) => {
    res.render('register-view');
})

router.post("/", async (req, res) => {
    try {
        const { username, password, password2 } = req.body;

        // cek username
        const user = await userModel.findOne({ username: username });

        // jika username sudah ada
        if (user) {
            console.log('username tidak tersedia');
            return res.render('register-view', { errMsg: 'username tidak tersedia' });
        } else {
            // jika password tidak sama
            if (password !== password2) {
                console.log('password salah');
                return res.render('register-view', { errMsg: 'password salah' });
            } else {
                const hash = await bcrypt.hash(password, 10);
                // buat user baru
                const addUser = new userModel({ username, password: hash });
                await addUser.save();
                return res.render('register-view', { msg: 'registrasi berhasil silahkan login' });
            }
        }
    } catch (error) {
        console.log(err);
    }
})
// -------------------------------------------------------------------

module.exports = router;