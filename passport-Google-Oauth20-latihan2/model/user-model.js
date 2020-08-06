const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    googleId: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('user', userSchema, 'passport-google-oauth20');