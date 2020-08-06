const mongoose = require('mongoose');
// const dbURL = 'mongodb+srv://zoeldyik:zoeldyik@zoeldyik-1nato.mongodb.net/latihan-passport-js?retryWrites=true&w=majority';

module.exports = mongoose.connect(process.env.DBURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
        err ? console.log(err) : console.log('db connected');
    })