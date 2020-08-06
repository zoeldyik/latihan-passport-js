const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DBURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    err => {
        if (err) {
            console.log(err);
        } else {
            console.log('db connected');
        }
    })